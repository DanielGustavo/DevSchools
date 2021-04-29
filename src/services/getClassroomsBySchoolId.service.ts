import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import School from '../database/models/School';

import AppError from '../errors/AppError';

export default async function getClassroomsBySchoolIdService(
  schoolId: string
): Promise<Classroom[]> {
  const schoolRepository = getRepository(School);

  const school = await schoolRepository.findOne(schoolId);

  if (!school) {
    throw new AppError(400, 'This school does not exists');
  }

  const classrooms = await school.classrooms;

  return classrooms;
}
