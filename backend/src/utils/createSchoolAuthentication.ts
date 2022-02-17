import jsonwebtoken from 'jsonwebtoken';

import User from '../database/models/User';
import School from '../database/models/School';

import jwtConfig from '../config/token';

import getSchoolByUserId from './getSchoolByUserId';

interface Request {
  user: User;
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

export default async function createSchoolAuthentication(
  request: Request
): Promise<Response> {
  const { user } = request;

  const school = await getSchoolByUserId(user.id);

  const jwtPayload: JWTPayload = {
    subject: user.id,
    isASchool: true,
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
