import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';

import AppError from '../errors/AppError';

import getSchoolByUserId from '../utils/getSchoolByUserId';

interface Request {
  classroomId: string;
  userDatas: {
    id: string;
    isASchool: Boolean;
  };
}

export default async function deleteAClassroomByIdService(
  request: Request
): Promise<Classroom> {
  const { userDatas, classroomId } = request;

  if (!userDatas.isASchool) {
    throw new AppError(403, 'You are not a user of type school');
  }

  const school = await getSchoolByUserId(userDatas.id);

  const classroomRepository = getRepository(Classroom);
  const classroom = await classroomRepository.findOne(classroomId);

  if (!classroom) {
    throw new AppError(400, 'This classroom does not exist');
  }

  const schoolIsNotTheOwnerOfThisClassroom = classroom.school_id !== school.id;

  if (schoolIsNotTheOwnerOfThisClassroom) {
    throw new AppError(
      403,
      'You can not delete a classroom that you do not own'
    );
  }

  await classroomRepository.delete(classroom);
  return classroom;
}
