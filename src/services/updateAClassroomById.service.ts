import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';

import AppError from '../errors/AppError';

import getSchoolByUserId from '../utils/getSchoolByUserId';

interface Request {
  classroomId: string;
  newTitle: string;
  userDatas: {
    id: string;
    isASchool: Boolean;
  };
}

export default async function updateAClassroomById(
  request: Request
): Promise<Classroom> {
  const { userDatas, classroomId, newTitle } = request;

  if (!userDatas.isASchool) {
    throw new AppError(403, 'You are not a user of type school');
  }

  const classroomRepository = getRepository(Classroom);

  const classroom = await classroomRepository.findOne(classroomId);

  if (!classroom) {
    throw new AppError(400, 'This classroom does not exist');
  }

  const school = await getSchoolByUserId(userDatas.id);

  const schoolDoesNotOwnThisClassroom = classroom.school_id !== school.id;

  if (schoolDoesNotOwnThisClassroom) {
    throw new AppError(403, 'You can not edit a classroom that you do not own');
  }

  const ThereIsAlreadyAClassroomWithThisTitleInThisSchool = !!(await classroomRepository.findOne(
    { where: { title: newTitle, school } }
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
