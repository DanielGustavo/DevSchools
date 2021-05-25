import { getRepository } from 'typeorm';

import Person from '../database/models/Person';
import AppError from '../errors/AppError';

interface Request {
  personId: string;
  schoolId: string;
}

export default async function getTeacherByPersonIdService(request: Request) {
  const personRepository = getRepository(Person);

  const teacher = await personRepository.findOne({
    where: { id: request.personId, role: 'teacher' },
    relations: ['classrooms', 'subjects'],
  });

  if (!teacher) {
    throw new AppError(400, 'This teacher is not registered in our system');
  }

  const schoolDoesNotOwnThisTeacher = teacher.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisTeacher) {
    throw new AppError(403, 'This teacher is not from your school');
  }

  return teacher;
}
