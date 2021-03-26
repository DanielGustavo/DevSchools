import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import User from '../database/models/User';

import AppError from '../errors/AppError';

import jwtConfig from '../config/token';

interface Request {
  username: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default async function createAuthenticationService(
  request: Request
): Promise<Response> {
  const { username, password } = request;

  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: { username },
  });

  if (!user) {
    throw new AppError(400, 'Username or password are invalid');
  }

  const passwordIsWrong = !(await bcrypt.compare(password, user.password));

  if (passwordIsWrong) {
    throw new AppError(400, 'Username or password are invalid');
  }

  const jwtPayload = {
    subject: user.id,
    isASchool: user.is_a_school,
  };

  const token = jsonwebtoken.sign(
    jwtPayload,
    jwtConfig.secret,
    jwtConfig.options
  );

  return { user, token };
}
