import { isBefore } from 'date-fns';

import { getRepository } from 'typeorm';

import Homework from '../database/models/Homework';
import Person from '../database/models/Person';
import Subject from '../database/models/Subject';

import AppError from '../errors/AppError';

interface Request {
  title: string;
  description?: string;
  deadline: number;
  classroomId: string;
  subjectId: string;
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
  } = request;

  const homeworkRepository = getRepository(Homework);

  const homework = await homeworkRepository.findOne(homeworkId);

  if (!homework) {
    throw new AppError(404, 'This homework does not exist.');
  }

  homework.title = title;
  homework.description = description || '';

  const deadlineChanged = new Date(homework.deadline).getTime() !== deadline;

  if (deadlineChanged) {
    const newDeadlineIsInAPastDate = isBefore(deadline, Date.now());

    if (newDeadlineIsInAPastDate) {
      throw new AppError(400, 'The deadline must be at a future date.');
    }

    homework.deadline = new Date(deadline);
  }

  const classroomIdChanged = homework.classroom_id !== classroomId;

  if (classroomIdChanged) {
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

  const subjectIdChanged = homework.subject_id !== subjectId;

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

    homework.subject_id = subjectId;
  }

  await homeworkRepository.save(homework);

  return homework;
}
