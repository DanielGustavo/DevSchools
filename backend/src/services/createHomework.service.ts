import { isBefore } from 'date-fns';
import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import Homework from '../database/models/Homework';
import Person from '../database/models/Person';

import AppError from '../errors/AppError';

interface Request {
  title: string;
  description?: string;
  deadline: number;
  classroomId: string;
  subjectId: string;
  teacherId: string;
}

export default async function createHomeworkService(request: Request) {
  const { deadline, teacherId, classroomId, subjectId, title, description } =
    request;

  const deadlineIsInAPastDate = isBefore(deadline, Date.now());

  if (deadlineIsInAPastDate) {
    throw new AppError(400, 'The deadline must be at a future date');
  }

  const personRepository = getRepository(Person);

  const teacher = await personRepository.findOne(teacherId, {
    relations: ['classrooms', 'subjects'],
    where: { role: 'teacher', id: teacherId },
  });

  if (!teacher) {
    throw new AppError(403, 'You are not a teacher.');
  }

  const classroom = teacher?.classrooms.find(
    (currentClassroom) => currentClassroom.id === classroomId
  );

  if (!classroom) {
    throw new AppError(
      403,
      'You must be registered in the classroom to create a homework.'
    );
  }

  const subject = teacher?.subjects.find(
    (currentSubject) => currentSubject.id === subjectId
  );

  if (!subject) {
    throw new AppError(
      403,
      'You must be registered in the subject to create a homework'
    );
  }

  const classroomRepository = getRepository(Classroom);

  const classroomHasSubject = !!(
    await classroomRepository.findOne(classroom.id, {
      relations: ['subjects'],
    })
  )?.subjects.find((currentSubject) => currentSubject.id === subjectId);

  if (!classroomHasSubject) {
    throw new AppError(403, 'This subject is not registered in this classroom');
  }

  const homeworkRepository = getRepository(Homework);

  const homework = homeworkRepository.create({
    title,
    description,
    deadline: new Date(deadline),
    subject,
    classroom,
    person: teacher,
  });

  await homeworkRepository.save(homework);

  return homework;
}
