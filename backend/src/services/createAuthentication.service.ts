import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import User from '../database/models/User';
import Person from '../database/models/Person';
import School from '../database/models/School';

import createPersonAuthentication from '../utils/createPersonAuthentication';
import createSchoolAuthentication from '../utils/createSchoolAuthentication';

import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
  person?: Person;
  school?: School;
}

export default async function createAuthentication(
  request: Request
): Promise<Response> {
  const { email, password } = request;

  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: { email },
  });

  if (!user) {
    throw new AppError(400, 'Email or password are invalid');
  }

  const passwordIsWrong = !(await bcrypt.compare(password, user.password));

  if (passwordIsWrong) {
    throw new AppError(400, 'Email or password are invalid');
  }

  let authenticationData;

  if (user.is_a_school) {
    authenticationData = await createSchoolAuthentication({ user });
  } else {
    authenticationData = await createPersonAuthentication({ user });
  }

  return authenticationData;
}
