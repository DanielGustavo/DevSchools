import { getRepository } from 'typeorm';
import { isAfter } from 'date-fns';

import AppError from '../errors/AppError';

import Person from '../database/models/Person';
import Homework from '../database/models/Homework';
import PersonToHomework from '../database/models/PersonToHomework';
import PersonToQuestion from '../database/models/PersonToQuestion';

interface Answer {
  questionId: string;
  alternativeId: string;
}

interface Request {
  homeworkId: string;
  personId: string;
  answers: Answer[];
}

export default async function answerHomeworkService(request: Request) {
  const { homeworkId, personId, answers } = request;

  const homeworkRepository = getRepository(Homework);
  const personRepository = getRepository(Person);
  const personToHomeworkRepository = getRepository(PersonToHomework);
  const personToQuestionRepository = getRepository(PersonToQuestion);

  const homework = await homeworkRepository.findOne(homeworkId, {
    relations: ['questions', 'questions.alternatives'],
  });

  if (!homework) {
    throw new AppError(404, 'This homework does not exist.');
  }

  homework?.questions.forEach((question) => {
    const answer = answers.find(
      (currentAnswer) => currentAnswer.questionId === question.id
    );

    if (!answer) {
      throw new AppError(403, 'You must answer all questions.');
    }
  });

  const student = await personRepository.findOne(personId, {
    where: {
      id: personId,
      role: 'student',
    },
  });

  if (!student) {
    throw new AppError(403, 'You are not a student.');
  }

  const now = new Date().getTime();
  const homeworkWasNotSent =
    !homework.sent_at || isAfter(homework.sent_at, now);

  if (homeworkWasNotSent) {
    throw new AppError(403, 'You can not answer this homework.');
  }

  const personAlreadyAnsweredTheHomework =
    !!(await personToHomeworkRepository.findOne({
      where: {
        person: { id: personId },
        homework: { id: homeworkId },
      },
    }));

  if (personAlreadyAnsweredTheHomework) {
    throw new AppError(403, 'You can not answer the same homework twice.');
  }

  const answersPromises = answers.map((answer) => {
    const answerRepeats = !!(
      answers.filter(
        (currentAnswer) => currentAnswer.questionId === answer.questionId
      ).length > 1
    );

    if (answerRepeats) {
      throw new AppError(403, 'You can not answer the same question twice.');
    }

    const question = homework.questions.find(
      (currentQuestion) => currentQuestion.id === answer.questionId
    );

    if (!question) {
      throw new AppError(403, 'All answered questions must exist in homework.');
    }

    const alternative = question.alternatives.find(
      (currentAlternative) => currentAlternative.id === answer.alternativeId
    );

    if (!alternative) {
      throw new AppError(
        403,
        'All choiced alternatives must exist in their questions.'
      );
    }

    const answerEntity = personToQuestionRepository.create({
      alternative: { id: answer.alternativeId },
      question: { id: answer.questionId },
      person: { id: personId },
    });

    return personToQuestionRepository.save(answerEntity);
  });

  await Promise.all(answersPromises);

  const personToHomeworkRelation = personToHomeworkRepository.create({
    homework,
    person: student,
  });
  await personToHomeworkRepository.save(personToHomeworkRelation);

  return { homework, student };
}
