import { getConnection, getRepository } from 'typeorm';
import { isAfter } from 'date-fns';

import Homework from '../database/models/Homework';

import AppError from '../errors/AppError';

interface Request {
  homeworkId: string;
  schoolId: string;
  person?: {
    id: string;
    role: string;
  };
}

export default async function getHomeworkByIdService(request: Request) {
  const { homeworkId, schoolId, person } = request;

  const homeworkRepository = getRepository(Homework);

  const homework = await homeworkRepository.findOne(homeworkId, {
    relations: ['classroom', 'questions'],
  });

  if (!homework) {
    throw new AppError(404, 'This homework does not exist.');
  }

  const homeworkIsRegisteredInThisSchool =
    homework.classroom.school_id === schoolId;

  if (!homeworkIsRegisteredInThisSchool) {
    throw new AppError(
      403,
      'This homework is not registered in this your school'
    );
  }

  if (person) {
    const personIsRegisteredInClassroomOfTheHomework = !!(await getConnection()
      .createQueryBuilder()
      .from('persons_classrooms', 'pc')
      .where('pc.classroom_id = :classroomId', {
        classroomId: homework?.classroom_id,
      })
      .andWhere('pc.person_id = :personId', { personId: person.id })
      .getCount());

    const personOwnsThisHomework = person.id === homework?.person_id;

    if (
      !personIsRegisteredInClassroomOfTheHomework &&
      !personOwnsThisHomework
    ) {
      throw new AppError(
        403,
        'You are not registered in the same classroom of this homework'
      );
    }

    const requesterIsAStudent = person.role === 'student';

    const now = new Date().getTime();
    const homeworkWasNotSent =
      !homework.sent_at || isAfter(homework.sent_at, now);

    if (requesterIsAStudent && homeworkWasNotSent) {
      throw new AppError(403, 'You can not access this homework.');
    }

    if (requesterIsAStudent) {
      homework.questions.forEach((question) => {
        Object.assign(question, { correct_alternative_id: undefined });
      });
    }
  }

  return homework;
}
