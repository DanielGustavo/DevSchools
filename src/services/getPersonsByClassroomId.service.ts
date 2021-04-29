import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import Person from '../database/models/Person';

import AppError from '../errors/AppError';

interface Request {
  classroomId: string;
  schoolId: string;
}

export default async function getPersonsByClassroomIdService(
  request: Request
): Promise<Person[]> {
  const { classroomId, schoolId } = request;

  const classroomRepository = getRepository(Classroom);

  const classroom = await classroomRepository.findOne(classroomId, {
    relations: ['persons'],
  });

  if (!classroom) {
    throw new AppError(400, 'This classroom does not exist');
  }

  const schoolDoesNotOwnThisClassroom = classroom.school_id !== schoolId;

  if (schoolDoesNotOwnThisClassroom) {
    throw new AppError(403, 'You can not access this classroom');
  }

  return classroom.persons;
}
