import { getConnection, getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import Person from '../database/models/Person';

import AppError from '../errors/AppError';

interface Request {
  classroomId: string;
  schoolId: string;
  page?: number;
  limit?: number;
  role?: string;
}

export default async function getPersonsByClassroomIdService(
  request: Request
): Promise<Person[]> {
  const {
    classroomId,
    schoolId,
    limit = 5,
    page = 1,
    role = 'student',
  } = request;

  const classroomRepository = getRepository(Classroom);

  const classroom = await classroomRepository.findOne(classroomId);

  if (!classroom) {
    throw new AppError(400, 'This classroom does not exist');
  }

  const schoolDoesNotOwnThisClassroom = classroom.school_id !== schoolId;

  if (schoolDoesNotOwnThisClassroom) {
    throw new AppError(403, 'You can not access this classroom');
  }

  classroom.persons = await getConnection()
    .createQueryBuilder(Person, 'person')
    .leftJoinAndSelect(
      'persons_classrooms',
      'pc',
      'pc.classroom_id = :classroomId AND pc.person_id = person.id',
      { classroomId }
    )
    .take(limit)
    .skip(limit * (page - 1))
    .where('pc.classroom_id = :classroomId AND person.role = :role', {
      classroomId,
      role,
    })
    .getMany();

  return classroom.persons;
}
