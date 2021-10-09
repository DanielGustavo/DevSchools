import { getRepository } from 'typeorm';

import Homework from '../database/models/Homework';
import AppError from '../errors/AppError';

interface Request {
  homeworkId: string;
  teacherId: string;
}

export default async function deleteAHomeworkService(request: Request) {
  const { homeworkId, teacherId } = request;

  const homeworkRepository = getRepository(Homework);

  const homework = await homeworkRepository.findOne(homeworkId);

  if (!homework) {
    throw new AppError(404, 'This homework does not exist.');
  }

  const teacherOwnsThisHomework = homework.person_id === teacherId;

  if (!teacherOwnsThisHomework) {
    throw new AppError(
      403,
      'You can not delete a homework that you do not own.'
    );
  }

  await homeworkRepository.delete(homeworkId);

  return homework;
}
