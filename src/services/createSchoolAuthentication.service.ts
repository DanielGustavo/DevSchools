import jsonwebtoken from 'jsonwebtoken';

import User from '../database/models/User';
import School from '../database/models/School';

import AppError from '../errors/AppError';

import jwtConfig from '../config/token';

import getSchoolByUserId from '../utils/getSchoolByUserId';

import checkCredentialsService from './checkCredentials.service';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
  school: School;
}

interface JWTPayload {
  subject: String;
  isASchool: Boolean;
  avatar: String | null;
  school: {
    id: String;
    name: String;
  };
}

export default async function createSchoolAuthenticationService(
  request: Request
): Promise<Response> {
  const user = await checkCredentialsService(request);

  if (!user.is_a_school) {
    throw new AppError(403, 'This user is not of type School');
  }

  const school = await getSchoolByUserId(user.id);

  const jwtPayload: JWTPayload = {
    subject: user.id,
    isASchool: user.is_a_school,
    avatar: user.avatar_filename,
    school: {
      name: school.name,
      id: school.id,
    },
  };

  const token = jsonwebtoken.sign(
    jwtPayload,
    jwtConfig.secret,
    jwtConfig.options
  );

  return { user, school, token };
}
