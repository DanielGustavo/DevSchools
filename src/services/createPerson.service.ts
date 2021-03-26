import { getRepository } from 'typeorm';

import Person from '../database/models/Person';

import createUserService from './createUser.service';

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

  const creatorIsntASchool = !creatorDatas.isASchool;

  if (creatorIsntASchool) {
    const errorMsg = 'You are not allowed to create a user of type "person"';
    throw new AppError(403, errorMsg);
  }

  const personRepository = getRepository(Person);

  const user = await createUserService({
    ...personDatas,
    isASchool: false,
  });

  const person = personRepository.create({
    role: personDatas.role,
    name: personDatas.name,
    user,
  });

  await personRepository.save(person);
  return person;
}
