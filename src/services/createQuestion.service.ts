import { getRepository } from 'typeorm';

import Alternative from '../database/models/Alternative';
import Homework from '../database/models/Homework';
import Question from '../database/models/Question';

import AppError from '../errors/AppError';

interface AlternativeRequest {
  text: string;
  correct: boolean;
}

interface Request {
  questionTitle: string;
  alternatives: AlternativeRequest[];
  homeworkId: string;
  teacherId: string;
}

export default async function createQuestionService(request: Request) {
  const { questionTitle, alternatives, homeworkId, teacherId } = request;

  const homeworkRepository = getRepository(Homework);

  const homework = await homeworkRepository.findOne(homeworkId, {
    relations: ['questions'],
  });

  const teacherOwnsThisHomework = homework?.person_id === teacherId;

  if (!teacherOwnsThisHomework) {
    throw new AppError(403, 'This is not your homework.');
  }

  if (homework?.questions.length === 10) {
    throw new AppError(403, 'A homework can not have more than 10 questions.');
  }

  if (alternatives.length < 2) {
    throw new AppError(403, 'A question must have at least 2 alternatives.');
  }

  if (alternatives.length > 5) {
    throw new AppError(
      403,
      'A question can not have more than 5 alternatives.'
    );
  }

  const correctAlternatives = alternatives.filter(
    (alternative) => alternative.correct === true
  );

  if (correctAlternatives.length < 1) {
    throw new AppError(403, 'A question must have a correct alternative.');
  }

  if (correctAlternatives.length > 1) {
    throw new AppError(
      403,
      'A question must have only one correct alternative'
    );
  }

  if (!homework) {
    throw new AppError(404, 'This homework does not exist.');
  }

  const questionRepository = getRepository(Question);

  const question = questionRepository.create({
    question: questionTitle,
    homework,
  });

  await questionRepository.save(question);

  alternatives.forEach(async (currentAlternative) => {
    const alternativeRepository = getRepository(Alternative);

    const alternative = alternativeRepository.create({
      text: currentAlternative.text,
      question,
    });

    await alternativeRepository.save(alternative);

    if (currentAlternative.correct) {
      question.correct_alternative = alternative;
      await questionRepository.save(question);
    }

    return alternative;
  });

  Object.assign(question.homework, { questions: undefined });

  return { question };
}
