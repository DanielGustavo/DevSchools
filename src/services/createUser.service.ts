import { getRepository } from 'typeorm';

import User from '../database/models/User';

import AppError from '../errors/AppError';

interface Request {
  username: string;
  password: string;
  isASchool: boolean;
}

export default async function createUserService(
  request: Request
): Promise<User> {
  const { username, password, isASchool: is_a_school } = request;

  const userRepository = getRepository(User);

  const usernameAlreadyExists = !!(await userRepository.findOne({
    where: { username },
  }));

  if (usernameAlreadyExists) {
    throw new AppError(400, 'This username already exists, try another one.');
  }

  const user = userRepository.create({
    username,
    password,
    is_a_school,
  });
  await userRepository.save(user);

  return user;
}
