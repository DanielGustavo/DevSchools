import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';

import AppError from '../errors/AppError';

interface Request {
  schoolId: string;
  classroomId: string;
}

export default async function getClassroomByIdService(request: Request) {
  const classroomRepository = getRepository(Classroom);

  const classroom = await classroomRepository.findOne({
    where: { id: request.classroomId },
    relations: ['subjects', 'persons'],
  });

  if (!classroom) {
    throw new AppError(400, 'This classroom does not exist');
  }

  const schoolDoesNotOwnThisClassroom =
    classroom.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisClassroom) {
    throw new AppError(403, 'Your school does not own this classroom');
  }

  return classroom;
}
