import { getRepository, getConnection } from 'typeorm';
import isAfter from 'date-fns/isAfter';

import Question from '../database/models/Question';

import AppError from '../errors/AppError';

interface Request {
  questionId: string;
  schoolId: string;
  person?: {
    id: string;
    role: string;
  };
}

export default async function getQuestionByIdService(request: Request) {
  const { questionId, schoolId, person } = request;

  const questionRepository = getRepository(Question);

  const question = await questionRepository.findOne(questionId, {
    relations: ['homework', 'alternatives', 'homework.classroom'],
  });

  if (!question) {
    throw new AppError(404, 'This question does not exist.');
  }

  const questionIsRegisteredInThisSchool =
    question.homework.classroom.school_id === schoolId;

  if (!questionIsRegisteredInThisSchool) {
    throw new AppError(
      403,
      'This question is not registered in this your school'
    );
  }

  const requesterIsAStudent = person?.role === 'student';

  const now = new Date().getTime();
  const homeworkWasNotSent =
    !question.homework.sent_at || isAfter(question.homework.sent_at, now);

  if (homeworkWasNotSent && requesterIsAStudent) {
    throw new AppError(403, 'You can not access this question.');
  }

  if (person) {
    const personIsRegisteredInClassroomOfTheQuestion = !!(await getConnection()
      .createQueryBuilder()
      .from('persons_classrooms', 'pc')
      .where('pc.classroom_id = :classroomId', {
        classroomId: question.homework.classroom_id,
      })
      .andWhere('pc.person_id = :personId', { personId: person.id })
      .getCount());

    const personOwnsThisQuestion = person.id === question.homework.person_id;

    if (
      !personIsRegisteredInClassroomOfTheQuestion &&
      !personOwnsThisQuestion
    ) {
      throw new AppError(
        403,
        'You are not registered in the same classroom of this homework'
      );
    }

    if (requesterIsAStudent) {
      Object.assign(question, { correct_alternative_id: undefined });
    }
  }

  return question;
}
