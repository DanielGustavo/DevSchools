import { getRepository } from 'typeorm';

import Person from '../database/models/Person';

import createUserService from './createUser.service';

import getSchoolByUserId from '../utils/getSchoolByUserId';

import AppError from '../errors/AppError';

interface Request {
  personDatas: {
    username: string;
    role: string;
    name: string;
    password: string;
  };
  creatorDatas: {
    id: string;
    isASchool: Boolean;
  };
}

export default async function createPersonService(
  request: Request
): Promise<Person> {
  const { personDatas, creatorDatas } = request;

  if (!creatorDatas.isASchool) {
    throw new AppError(403, 'You are not a user of type school');
  }

  const school = await getSchoolByUserId(creatorDatas.id);

  const user = await createUserService({
    ...personDatas,
    isASchool: false,
  });

  const personRepository = getRepository(Person);

  const person = personRepository.create({
    role: personDatas.role,
    name: personDatas.name,
    school,
    user,
  });

  await personRepository.save(person);
  return person;
}
