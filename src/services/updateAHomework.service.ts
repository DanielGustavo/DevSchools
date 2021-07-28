import { isBefore, subDays } from 'date-fns';

import { getRepository } from 'typeorm';

import Homework from '../database/models/Homework';
import Person from '../database/models/Person';
import Subject from '../database/models/Subject';

import AppError from '../errors/AppError';

interface Request {
  title?: string;
  description?: string;
  deadline?: number;
  sentAt?: number | null;
  classroomId?: string;
  subjectId?: string;
  homeworkId: string;
  teacherId: string;
}

export default async function updateAHomeworkService(request: Request) {
  const {
    deadline,
    teacherId,
    classroomId,
    subjectId,
    title,
    description,
    homeworkId,
    sentAt,
  } = request;

  const homeworkRepository = getRepository(Homework);

  const homework = await homeworkRepository.findOne(homeworkId);

  if (!homework) {
    throw new AppError(404, 'This homework does not exist.');
  }

  homework.title = title || homework.title;
  homework.description = description || homework.description;

  const deadlineChanged =
    deadline !== undefined &&
    new Date(homework.deadline).getTime() !== deadline;

  if (deadlineChanged && deadline !== undefined) {
    const newDeadlineIsInAPastDate = isBefore(deadline, Date.now());

    if (newDeadlineIsInAPastDate) {
      throw new AppError(400, 'The deadline must be at a future date.');
    }

    homework.deadline = new Date(deadline);
  }

  const sentAtChanged =
    sentAt !== undefined && homework.sent_at === null
      ? true
      : new Date(homework.sent_at as Date).getTime() !== sentAt;

  if (sentAtChanged && sentAt !== undefined) {
    if (sentAt === null) {
      homework.sent_at = null;
    } else {
      const oneDayBefore = subDays(Date.now(), 1);
      const newSentAtIsOneDayInPast = isBefore(sentAt, oneDayBefore);

      if (newSentAtIsOneDayInPast) {
        throw new AppError(
          400,
          'A homework can not be setted as sent one day before the current day.'
        );
      }

      homework.sent_at = new Date(sentAt);
    }
  }

  const classroomIdChanged =
    classroomId !== undefined && homework.classroom_id !== classroomId;

  if (classroomIdChanged && classroomId !== undefined) {
    const personRepository = getRepository(Person);

    const teacher = await personRepository.findOne(teacherId, {
      relations: ['classrooms'],
    });

    const teacherIsRegisteredInNewClassroom = !!teacher?.classrooms.find(
      (classroom) => classroom.id === classroomId
    );

    if (!teacherIsRegisteredInNewClassroom) {
      throw new AppError(
        403,
        'You can insert homeworks only in classrooms where you are registered.'
      );
    }

    homework.classroom_id = classroomId;
  }

  const subjectIdChanged =
    subjectId !== undefined && homework.subject_id !== subjectId;

  if (subjectIdChanged || classroomIdChanged) {
    const subjectRepository = getRepository(Subject);

    const currentSubjectId = subjectIdChanged ? subjectId : homework.subject_id;

    const subject = await subjectRepository.findOne(currentSubjectId, {
      relations: ['classrooms', 'persons'],
    });

    const subjectIsRegisteredInClassroom = subject?.classrooms.find(
      (currentClassroom) => currentClassroom.id === homework.classroom_id
    );

    if (!subjectIsRegisteredInClassroom) {
      throw new AppError(
        403,
        `This subject is not registered in the classroom where you are trying to insert this homework.`
      );
    }

    const teacherIsRegisteredInSubject = subject?.persons.find(
      (person) => person.id === teacherId
    );

    if (!teacherIsRegisteredInSubject) {
      throw new AppError(
        403,
        'You are not registered in the subject where you are trying to insert this homework.'
      );
    }

    homework.subject_id = currentSubjectId as string;
  }

  await homeworkRepository.save(homework);

  return homework;
}
