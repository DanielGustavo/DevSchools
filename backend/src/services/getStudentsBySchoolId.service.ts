import { getRepository } from 'typeorm';

import Person from '../database/models/Person';
import School from '../database/models/School';

import AppError from '../errors/AppError';

interface Request {
  schoolId: string;
  page?: number;
  limit?: number;
}

export default async function getStudentsBySchoolIdService(request: Request) {
  const { schoolId, page = 1, limit = 5 } = request;

  const schoolRepository = getRepository(School);

  const school = await schoolRepository.findOne(schoolId);

  if (!school) {
    throw new AppError(400, 'This school does not exist');
  }

  const personRepository = getRepository(Person);

  const students = await personRepository.find({
    where: { school_id: schoolId, role: 'student' },
    take: limit,
    skip: limit * (page - 1),
  });

  return students;
}
