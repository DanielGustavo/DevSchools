import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import User from '../database/models/User';

import AppError from '../errors/AppError';

interface Request {
  username: string;
  password: string;
}

export default async function checkCredentialsService(
  request: Request
): Promise<User> {
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

  return user;
}
