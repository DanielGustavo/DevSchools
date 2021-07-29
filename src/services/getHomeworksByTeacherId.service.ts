import { getRepository } from 'typeorm';

import Homework from '../database/models/Homework';
import Person from '../database/models/Person';

import AppError from '../errors/AppError';

interface Request {
  teacherId: string;
  schoolId: string;
  classroomId?: string;
  subjectId?: string;
  limit?: number;
  page?: number;
}

export default async function getHomeworksByTeacherIdService(request: Request) {
  const {
    schoolId,
    teacherId,
    classroomId,
    subjectId,
    page = 1,
    limit = 5,
  } = request;

  const personRepository = getRepository(Person);

  const teacher = await personRepository.findOne(teacherId, {
    where: { id: teacherId, role: 'teacher' },
  });

  if (!teacher) {
    throw new AppError(404, 'This teacher does not exist.');
  }

  const teacherIsRegisteredInThisSchool = teacher.school_id === schoolId;

  if (!teacherIsRegisteredInThisSchool) {
    throw new AppError(403, 'This teacher is not registered in your school.');
  }

  const homeworkRepository = getRepository(Homework);

  const homeworksFilter = { person_id: teacherId };

  if (classroomId) {
    Object.assign(homeworksFilter, { classroom_id: classroomId });
  }

  if (subjectId) {
    Object.assign(homeworksFilter, { subject_id: subjectId });
  }

  const homeworks = await homeworkRepository.find({
    where: homeworksFilter,
    take: limit,
    skip: (page - 1) * limit,
  });

  return homeworks;
}
