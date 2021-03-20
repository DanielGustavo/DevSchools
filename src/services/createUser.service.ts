import { getRepository } from 'typeorm';

import User from '../database/models/User';

import AppError from '../errors/AppError';

interface Request {
  username: string;
  name: string;
  password: string;
  isASchool: boolean;
}

export default async function createUser(request: Request): Promise<User> {
  const { username, name, password, isASchool: is_a_school } = request;

  const userRepository = getRepository(User);

  const usernameAlreadyExists = !!(await userRepository.findOne({
    where: { username },
  }));

  if (usernameAlreadyExists) {
    throw new AppError(400, 'This username already exists, try another one.');
  }

  const user = userRepository.create({
    username,
    name,
    password,
    is_a_school,
  });
  await userRepository.save(user);

  return user;
}
