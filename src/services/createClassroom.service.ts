import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';

import AppError from '../errors/AppError';

import getSchoolByUserId from '../utils/getSchoolByUserId';

interface Request {
  title: string;
  userDatas: {
    id: string;
    isASchool: Boolean;
  };
}

export default async function createClassroomService(
  request: Request
): Promise<Classroom> {
  const { title, userDatas } = request;

  const school = await getSchoolByUserId(userDatas.id);

  const classroomRepository = getRepository(Classroom);

  const schoolAlreadyHasAClassroomWithThisTitle = !!(await classroomRepository.findOne(
    { where: { school, title } }
  ));

  if (schoolAlreadyHasAClassroomWithThisTitle) {
    throw new AppError(400, 'There is a classroom with this title already');
  }

  const classroom = classroomRepository.create({
    title,
    school,
  });

  await classroomRepository.save(classroom);
  return classroom;
}
