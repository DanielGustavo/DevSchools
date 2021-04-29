import { getRepository } from 'typeorm';

import Person from '../database/models/Person';
import School from '../database/models/School';

import AppError from '../errors/AppError';

export default async function getStudentsBySchoolIdService(schoolId: string) {
  const schoolRepository = getRepository(School);

  const school = await schoolRepository.findOne(schoolId);

  if (!school) {
    throw new AppError(400, 'This school does not exist');
  }

  const personRepository = getRepository(Person);

  const students = await personRepository.find({
    where: { school_id: schoolId, role: 'student' },
  });

  return students;
}
