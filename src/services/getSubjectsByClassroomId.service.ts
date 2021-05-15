import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';

import AppError from '../errors/AppError';

interface Request {
  classroomId: string;
  schoolId: string;
}

export default async function getSubjectsByClassroomIdService(
  request: Request
) {
  const classroomRepository = getRepository(Classroom);

  const classroom = await classroomRepository.findOne({
    where: { id: request.classroomId },
    relations: ['subjects'],
  });

  if (!classroom) {
    throw new AppError(400, 'This classroom does not exist');
  }

  const schoolDoesNotOwnThisClassroom =
    classroom.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisClassroom) {
    throw new AppError(
      403,
      'You can not get subjects from a classroom that is not in your school'
    );
  }

  return classroom.subjects;
}
