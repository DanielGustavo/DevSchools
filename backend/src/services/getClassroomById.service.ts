import { getConnection, getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import Person from '../database/models/Person';
import Subject from '../database/models/Subject';

import AppError from '../errors/AppError';

interface Request {
  schoolId: string;
  classroomId: string;
}

export default async function getClassroomByIdService(request: Request) {
  const classroomRepository = getRepository(Classroom);

  const classroom = await classroomRepository.findOne(request.classroomId);

  if (!classroom) {
    throw new AppError(400, 'This classroom does not exist');
  }

  const schoolDoesNotOwnThisClassroom =
    classroom.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisClassroom) {
    throw new AppError(403, 'Your school does not own this classroom');
  }

  classroom.subjects = await getConnection()
    .createQueryBuilder(Subject, 'subject')
    .leftJoinAndSelect(
      'classrooms_subjects',
      'cs',
      'cs.classroom_id = :classroomId AND cs.subject_id = subject.id',
      { classroomId: request.classroomId }
    )
    .take(5)
    .where('cs.classroom_id = :classroomId', {
      classroomId: request.classroomId,
    })
    .getMany();

  classroom.persons = await getConnection()
    .createQueryBuilder(Person, 'person')
    .leftJoinAndSelect(
      'persons_classrooms',
      'pc',
      'pc.classroom_id = :classroomId AND pc.person_id = person.id',
      { classroomId: request.classroomId }
    )
    .take(5)
    .where('pc.classroom_id = :classroomId', {
      classroomId: request.classroomId,
    })
    .getMany();

  return classroom;
}
