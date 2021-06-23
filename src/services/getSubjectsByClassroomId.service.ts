import { getConnection, getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import Subject from '../database/models/Subject';

import AppError from '../errors/AppError';

interface Request {
  classroomId: string;
  schoolId: string;
  page?: number;
  limit?: number;
}

export default async function getSubjectsByClassroomIdService(
  request: Request
) {
  const { classroomId, schoolId, page = 1, limit = 5 } = request;

  const classroomRepository = getRepository(Classroom);

  const classroom = await classroomRepository.findOne(classroomId);

  if (!classroom) {
    throw new AppError(400, 'This classroom does not exist');
  }

  const schoolDoesNotOwnThisClassroom = classroom.school_id !== schoolId;

  if (schoolDoesNotOwnThisClassroom) {
    throw new AppError(
      403,
      'You can not get subjects from a classroom that is not in your school'
    );
  }

  classroom.subjects = await getConnection()
    .createQueryBuilder(Subject, 'subject')
    .leftJoinAndSelect(
      'classrooms_subjects',
      'cs',
      'cs.classroom_id = :classroomId AND cs.subject_id = subject.id',
      { classroomId }
    )
    .take(limit)
    .skip(limit * (page - 1))
    .where('cs.classroom_id = :classroomId', { classroomId })
    .getMany();

  return classroom.subjects;
}
