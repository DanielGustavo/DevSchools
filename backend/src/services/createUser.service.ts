import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import User from '../database/models/User';

import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
  isASchool: boolean;
}

export default async function createUserService(
  request: Request
): Promise<User> {
  const { email, password, isASchool: is_a_school } = request;

  const userRepository = getRepository(User);

  const EmailAlreadyExists = !!(await userRepository.findOne({
    where: { email },
  }));

  if (EmailAlreadyExists) {
    throw new AppError(400, 'This email already exists, try another one.');
  }

  const passwordHash = await bcrypt.hash(password, 7);

  const user = userRepository.create({
    email,
    password: passwordHash,
    is_a_school,
  });
  await userRepository.save(user);

  return user;
}
