import { getConnection, getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import Homework from '../database/models/Homework';
import Person from '../database/models/Person';
import Subject from '../database/models/Subject';

import AppError from '../errors/AppError';

interface Request {
  teacherId: string;
  schoolId: string;
  person?: {
    role: string;
  };
}

export default async function getTeacherByPersonIdService(request: Request) {
  const { person, teacherId, schoolId } = request;

  const personRepository = getRepository(Person);

  const teacher = await personRepository.findOne({
    where: { id: teacherId, role: 'teacher' },
  });

  if (!teacher) {
    throw new AppError(400, 'This teacher is not registered in our system');
  }

  const schoolDoesNotOwnThisTeacher = teacher.school_id !== schoolId;

  if (schoolDoesNotOwnThisTeacher) {
    throw new AppError(403, 'This teacher is not from your school');
  }

  teacher.classrooms = await getConnection()
    .createQueryBuilder(Classroom, 'classroom')
    .leftJoinAndSelect(
      'persons_classrooms',
      'pc',
      'pc.classroom_id = classroom.id AND pc.person_id = :personId',
      { personId: teacherId }
    )
    .take(5)
    .where('pc.person_id = :personId', { personId: teacherId })
    .getMany();

  teacher.subjects = await getConnection()
    .createQueryBuilder(Subject, 'subject')
    .leftJoinAndSelect(
      'persons_subjects',
      'ps',
      'ps.subject_id = subject.id AND ps.person_id = :personId',
      { personId: teacherId }
    )
    .take(5)
    .where('ps.person_id = :personId', { personId: teacherId })
    .getMany();

  const homeworkQueryBuilder = getConnection()
    .createQueryBuilder(Homework, 'homework')
    .leftJoinAndSelect('persons', 'person', 'person.id = homework.person_id')
    .take(5)
    .where('person.id = :personId', { personId: teacherId });

  const requesterIsAStudent = person && person?.role === 'student';

  if (requesterIsAStudent) {
    homeworkQueryBuilder.where('homework.sent_at <= :now', { now: new Date() });
  }

  teacher.homeworks = await homeworkQueryBuilder.getMany();

  return teacher;
}
