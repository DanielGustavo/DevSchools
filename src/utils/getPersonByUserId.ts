import { getRepository } from 'typeorm';

import Person from '../database/models/Person';
import User from '../database/models/User';

import AppError from '../errors/AppError';

export default async function getPersonByUserId(
  userId: string
): Promise<Person> {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(userId, {
    relations: ['person'],
  });

  if (user?.is_a_school) {
    throw new AppError(403, 'You are not a user of type person');
  }

  const person = user?.person;

  if (!person) {
    throw new AppError(403, 'You are not a registered person');
  }

  return person;
}
