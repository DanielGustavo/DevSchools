import jsonwebtoken from 'jsonwebtoken';

import User from '../database/models/User';
import Person from '../database/models/Person';

import AppError from '../errors/AppError';

import jwtConfig from '../config/token';

import getPersonByUserId from '../utils/getPersonByUserId';

import checkCredentialsService from './checkCredentials.service';

interface Request {
  username: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
  person: Person;
}

interface JWTPayload {
  subject: String;
  isASchool: Boolean;
  avatar: String | null;
  person: {
    name: String;
    id: String;
    role: String;
    schoolId: String;
  };
}

export default async function createPersonAuthenticationService(
  request: Request
): Promise<Response> {
  const user = await checkCredentialsService(request);

  if (user.is_a_school) {
    throw new AppError(403, 'This user is not of type Person');
  }

  const person = await getPersonByUserId(user.id);

  const jwtPayload: JWTPayload = {
    subject: user.id,
    isASchool: user.is_a_school,
    avatar: user.avatar_filename,
    person: {
      name: person.name,
      id: person.id,
      role: person.role,
      schoolId: person.school_id,
    },
  };

  const token = jsonwebtoken.sign(
    jwtPayload,
    jwtConfig.secret,
    jwtConfig.options
  );

  return { user, person, token };
}
