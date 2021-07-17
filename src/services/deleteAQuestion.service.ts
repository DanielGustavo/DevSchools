import { getRepository } from 'typeorm';

import Question from '../database/models/Question';

import AppError from '../errors/AppError';

interface Request {
  questionId: string;
  teacherId: string;
}

export default async function deleteAQuestionService(request: Request) {
  const { questionId, teacherId } = request;

  const questionRepository = getRepository(Question);

  const question = await questionRepository.findOne(questionId, {
    relations: ['homework'],
  });

  if (!question) {
    throw new AppError(404, 'This question does not exist.');
  }

  const teacherOwnsQuestion = question.homework.person_id === teacherId;

  if (!teacherOwnsQuestion) {
    throw new AppError(403, 'You do not own this question.');
  }

  await questionRepository.remove(question);

  return question;
}
