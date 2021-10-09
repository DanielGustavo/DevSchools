import { getRepository } from 'typeorm';

import School from '../database/models/School';
import User from '../database/models/User';

import AppError from '../errors/AppError';

export default async function getSchoolByUserId(
  userId: string
): Promise<School> {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(userId, {
    relations: ['school'],
  });

  if (!user?.is_a_school) {
    throw new AppError(403, 'You are not a user of type school');
  }

  const school = user?.school;

  if (!school) {
    throw new AppError(403, 'You does not have a school');
  }

  return school;
}
