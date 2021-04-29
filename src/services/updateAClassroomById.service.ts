import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';

import AppError from '../errors/AppError';

interface Request {
  classroomId: string;
  newTitle: string;
  schoolId: string;
}

export default async function updateAClassroomByIdService(
  request: Request
): Promise<Classroom> {
  const { schoolId, classroomId, newTitle } = request;

  const classroomRepository = getRepository(Classroom);

  const classroom = await classroomRepository.findOne(classroomId);

  if (!classroom) {
    throw new AppError(400, 'This classroom does not exist');
  }

  const schoolDoesNotOwnThisClassroom = classroom.school_id !== schoolId;

  if (schoolDoesNotOwnThisClassroom) {
    throw new AppError(403, 'You can not edit a classroom that you do not own');
  }

  const ThereIsAlreadyAClassroomWithThisTitleInThisSchool = !!(await classroomRepository.findOne(
    { where: { title: newTitle, school_id: schoolId } }
  ));

  if (ThereIsAlreadyAClassroomWithThisTitleInThisSchool) {
    throw new AppError(
      400,
      'There is already a classroom with this title in your school'
    );
  }

  classroom.title = newTitle;
  classroomRepository.save(classroom);

  return classroom;
}
