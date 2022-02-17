import { getConnection } from 'typeorm';

import Person from '../database/models/Person';

import AppError from '../errors/AppError';

interface Request {
  schoolId: string;
  subjectId: string;
  personId: string;
}

export default async function deleteTeacherFromSubjectService(
  request: Request
) {
  const teacher = await getConnection()
    .createQueryBuilder(Person, 'person')
    .leftJoinAndSelect(
      'person.subjects',
      'subject',
      'subject.id = :subjectId',
      { subjectId: request.subjectId }
    )
    .where('person.id = :personId AND person.role = :role', {
      personId: request.personId,
      role: 'teacher',
    })
    .select()
    .getOne();

  if (!teacher) {
    throw new AppError(400, 'This teacher is not registered in our system');
  }

  const schoolDoesNotOwnThisTeacher = teacher.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisTeacher) {
    throw new AppError(403, 'This teacher is not registered in your school');
  }

  const subject = teacher.subjects[0];

  if (!subject) {
    throw new AppError(400, 'This teacher is not inserted in this subject');
  }

  const schoolDoesNotOwnThisSubject = subject.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisSubject) {
    throw new AppError(403, 'This subject is not registered in your school');
  }

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from('persons_subjects')
    .where('person_id = :personId AND subject_id = :subjectId', {
      personId: request.personId,
      subjectId: request.subjectId,
    })
    .execute();

  return teacher;
}
