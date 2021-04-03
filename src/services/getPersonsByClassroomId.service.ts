import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import Person from '../database/models/Person';

import AppError from '../errors/AppError';

import getSchoolByUserId from '../utils/getSchoolByUserId';

interface Request {
  classroomId: string;
  userDatas: {
    id: string;
    isASchool: Boolean;
  };
}

export default async function getPersonsByClassroomIdService(
  request: Request
): Promise<Person[]> {
  const { classroomId, userDatas } = request;

  if (!userDatas.isASchool) {
    throw new AppError(403, 'You are not a user of type school');
  }

  const classroomRepository = getRepository(Classroom);

  const classroom = await classroomRepository.findOne(classroomId, {
    relations: ['persons'],
  });

  if (!classroom) {
    throw new AppError(400, 'This classroom does not exist');
  }

  const school = await getSchoolByUserId(userDatas.id);

  const schoolDoesNotOwnThisClassroom = classroom.school_id !== school.id;

  if (schoolDoesNotOwnThisClassroom) {
    throw new AppError(403, 'You can not access this classroom');
  }

  return classroom.persons;
}
