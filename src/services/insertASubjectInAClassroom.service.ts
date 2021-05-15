import { getConnection, getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import Subject from '../database/models/Subject';

import AppError from '../errors/AppError';

interface Request {
  subjectId: string;
  classroomId: string;
  schoolId: string;
}

export default async function insertASubjectInAClassroomService(
  request: Request
) {
  const subjectRepository = getRepository(Subject);

  const subject = await subjectRepository.findOne(request.subjectId);

  if (!subject) {
    throw new AppError(400, 'This subject does not exist');
  }

  const schoolDoesNotOwnThisSubject = subject.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisSubject) {
    throw new AppError(403, 'Your school does not own this subject');
  }

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

  const classroomRelationalQueryBuilder = getConnection()
    .createQueryBuilder()
    .relation(Classroom, 'subjects')
    .of(classroom);

  await classroomRelationalQueryBuilder.add(subject);
  return { subject, classroom };
}
