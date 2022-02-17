import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import School from '../database/models/School';

import AppError from '../errors/AppError';

interface Request {
  schoolId: string;
  page?: number;
  limit?: number;
}

export default async function getClassroomsBySchoolIdService(
  request: Request
): Promise<Classroom[]> {
  const { schoolId, page = 1, limit = 5 } = request;

  const schoolRepository = getRepository(School);

  const school = await schoolRepository.findOne(schoolId);

  if (!school) {
    throw new AppError(400, 'This school does not exist');
  }

  const classroomRepository = getRepository(Classroom);

  const classrooms = await classroomRepository.find({
    where: { school_id: schoolId },
    skip: limit * (page - 1),
    take: limit,
  });

  return classrooms;
}
