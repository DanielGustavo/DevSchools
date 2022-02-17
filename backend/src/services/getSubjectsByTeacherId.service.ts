import { getConnection, getRepository } from 'typeorm';

import Person from '../database/models/Person';
import Subject from '../database/models/Subject';

import AppError from '../errors/AppError';

interface Request {
  teacherId: string;
  schoolId: string;
  page?: number;
  limit?: number;
}

export default async function getSubjectsByTeacherIdService(request: Request) {
  const { teacherId, schoolId, page = 1, limit = 5 } = request;

  const personRepository = getRepository(Person);

  const teacher = await personRepository.findOne({
    where: { id: teacherId, role: 'teacher' },
  });

  if (!teacher) {
    throw new AppError(404, 'This teacher does not exist');
  }

  const SchoolDoesNotOwnThisTeacher = teacher.school_id !== schoolId;

  if (SchoolDoesNotOwnThisTeacher) {
    throw new AppError(
      403,
      'You can not get subjects from a teacher that is not in your school'
    );
  }

  teacher.subjects = await getConnection()
    .createQueryBuilder(Subject, 'subject')
    .leftJoinAndSelect(
      'persons_subjects',
      'ps',
      'ps.person_id = :teacherId AND ps.subject_id = subject.id',
      { teacherId }
    )
    .take(limit)
    .skip(limit * (page - 1))
    .where('ps.person_id = :teacherId', { teacherId })
    .getMany();

  return teacher.subjects;
}
