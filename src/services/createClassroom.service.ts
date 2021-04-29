import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';

import AppError from '../errors/AppError';

interface Request {
  title: string;
  schoolId: string;
}

export default async function createClassroomService(
  request: Request
): Promise<Classroom> {
  const { title, schoolId } = request;

  const classroomRepository = getRepository(Classroom);

  const schoolAlreadyHasAClassroomWithThisTitle = !!(await classroomRepository.findOne(
    { where: { school_id: schoolId, title } }
  ));

  if (schoolAlreadyHasAClassroomWithThisTitle) {
    throw new AppError(400, 'There is a classroom with this title already');
  }

  const classroom = classroomRepository.create({
    title,
    school_id: schoolId,
  });

  await classroomRepository.save(classroom);
  return classroom;
}
