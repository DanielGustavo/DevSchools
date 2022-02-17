import { getConnection, getRepository } from 'typeorm';

import Person from '../database/models/Person';
import Subject from '../database/models/Subject';

import AppError from '../errors/AppError';

interface Request {
  personId: string;
  schoolId: string;
  subjectId: string;
}

export default async function insertATeacherInASubjectService(
  request: Request
) {
  const subjectRepository = getRepository(Subject);

  const subject = await subjectRepository.findOne({
    where: { id: request.subjectId },
    relations: ['persons'],
  });

  if (!subject) {
    throw new AppError(400, 'This subject does not exist');
  }

  const schoolDoesNotOwnThisSubject = subject.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisSubject) {
    throw new AppError(403, 'Your school does not own this subject');
  }

  const personRepository = getRepository(Person);

  const person = await personRepository.findOne(request.personId);

  if (!person) {
    throw new AppError(400, 'This person is not registered in our system');
  }

  const personIsNotATeacher = person.role !== 'teacher';

  if (personIsNotATeacher) {
    throw new AppError(403, 'Only teachers can get registered in a subject');
  }

  const schoolDoesNotOwnThisTeacher = person.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisTeacher) {
    throw new AppError(403, 'This teacher is not registered in your school');
  }

  const teacherIsAlreadyRegisteredInThisSubject = !!subject.persons.find(
    (currentPerson) => currentPerson.id === person.id
  );

  if (teacherIsAlreadyRegisteredInThisSubject) {
    throw new AppError(
      403,
      'This teacher is already registered in this subject'
    );
  }

  const subjectRelationQueryBuilder = getConnection()
    .createQueryBuilder()
    .relation(Subject, 'persons')
    .of(subject);

  await subjectRelationQueryBuilder.add(person.id);
  return { person, subject };
}
