import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import Person from '../database/models/Person';

import AppError from '../errors/AppError';

import getSchoolByUserId from '../utils/getSchoolByUserId';

interface Request {
  personId: string;
  userDatas: {
    id: string;
    isASchool: Boolean;
  };
}

export default async function getClassroomsByPersonIdService(
  request: Request
): Promise<Classroom[]> {
  const { personId, userDatas } = request;

  const personRepository = getRepository(Person);

  const person = await personRepository.findOne({
    where: { id: personId },
    relations: ['user', 'classrooms', 'school'],
  });

  if (!person) {
    throw new AppError(400, 'This person does not exists');
  }

  if (userDatas.isASchool) {
    const school = await getSchoolByUserId(userDatas.id);

    const personIsNotRegisteredInThisSchool = person.school.id !== school.id;

    if (personIsNotRegisteredInThisSchool) {
      throw new AppError(403, 'This person is not registered in your school');
    }
  }

  const isNotTheOwnerOfThePersonAccount = userDatas.id !== person?.user.id;

  if (isNotTheOwnerOfThePersonAccount && !userDatas.isASchool) {
    throw new AppError(403, 'You can not access the classrooms of this person');
  }

  return person?.classrooms;
}
