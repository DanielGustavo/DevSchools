import { getConnection } from 'typeorm';

import Person from '../database/models/Person';

import AppError from '../errors/AppError';

interface Request {
  personId: string;
  classroomId: string;
  schoolId: string;
}

export default async function deletePersonFromClassroomService(
  request: Request
) {
  const person = await getConnection()
    .createQueryBuilder(Person, 'person')
    .leftJoinAndSelect(
      'person.classrooms',
      'classroom',
      'classroom.id = :classroomId',
      { classroomId: request.classroomId }
    )
    .where('person.id = :personId', { personId: request.personId })
    .getOne();

  if (!person) {
    throw new AppError(400, 'This person is not registered in our system');
  }

  const schoolDoesNotOwnThisPerson = person.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisPerson) {
    throw new AppError(403, 'This person is not registered in your school');
  }

  const classroom = person.classrooms[0];

  if (!classroom) {
    throw new AppError(403, 'This person is not inserted in this classroom');
  }

  const schoolDoesNotOwnThisClassroom =
    classroom.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisClassroom) {
    throw new AppError(403, 'Your school does not own this classroom');
  }

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from('persons_classrooms')
    .where('person_id = :personId AND classroom_id = :classroomId', {
      personId: request.personId,
      classroomId: request.classroomId,
    })
    .execute();

  return person;
}
