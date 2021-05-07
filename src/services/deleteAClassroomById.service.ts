import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';

import AppError from '../errors/AppError';

interface Request {
  classroomId: string;
  schoolId: string;
}

export default async function deleteAClassroomByIdService(
  request: Request
): Promise<Classroom> {
  const { schoolId, classroomId } = request;

  const classroomRepository = getRepository(Classroom);
  const classroom = await classroomRepository.findOne(classroomId);

  if (!classroom) {
    throw new AppError(400, 'This classroom does not exist');
  }

  const schoolIsNotTheOwnerOfThisClassroom = classroom.school_id !== schoolId;

  if (schoolIsNotTheOwnerOfThisClassroom) {
    throw new AppError(
      403,
      'You can not delete a classroom that you do not own'
    );
  }

  await classroomRepository.delete(classroomId);
  return classroom;
}
