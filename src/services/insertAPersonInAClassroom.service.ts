import { getConnection, getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import Person from '../database/models/Person';
import School from '../database/models/School';

import AppError from '../errors/AppError';

import getSchoolByUserId from '../utils/getSchoolByUserId';

interface Request {
  classroomId: string;
  personId: string;
  userDatas: {
    id: string;
    isASchool: Boolean;
  };
}

interface Response {
  classroom: Classroom;
  person: Person;
  school: School;
}

export default async function insertAPersonInAClassroomService(
  request: Request
): Promise<Response> {
  const { userDatas, classroomId, personId } = request;

  const classroomRepository = getRepository(Classroom);

  const classroom = await classroomRepository.findOne({
    where: { id: classroomId },
  });

  if (!classroom) {
    throw new AppError(400, 'This classroom does not exists');
  }

  const school = await getSchoolByUserId(userDatas.id);

  const schoolDoesNotOwnThisClassroom = classroom.school_id !== school.id;

  if (schoolDoesNotOwnThisClassroom) {
    throw new AppError(
      403,
      'You can not insert a person in a classroom that you do not own'
    );
  }

  const personRepository = getRepository(Person);
  const person = await personRepository.findOne(personId, {
    relations: ['classrooms'],
  });

  if (!person) {
    throw new AppError(400, 'This person is not registered in our system');
  }

  const personIsAlreadyInsertedInThisClassroom = person.classrooms.find(
    (currentClassroom) => currentClassroom.id === classroomId
  );

  if (personIsAlreadyInsertedInThisClassroom) {
    throw new AppError(
      403,
      'This person is already registered in this classroom'
    );
  }

  const personIsRegisteredInAnotherSchool = person.school_id !== school.id;

  if (personIsRegisteredInAnotherSchool) {
    throw new AppError(403, 'This person is not registered in your school');
  }

  const relationalQueryBuilderOfClassroom = getConnection()
    .createQueryBuilder()
    .relation(Classroom, 'persons')
    .of(classroom);

  await relationalQueryBuilderOfClassroom.add(person);

  return { person, school, classroom };
}
