import { getRepository } from 'typeorm';

import Person from '../database/models/Person';
import User from '../database/models/User';

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

  const userRepository = getRepository(User);

  const creatorUser = await userRepository.findOne(creatorDatas.id, {
    relations: ['school'],
  });
  const school = creatorUser?.school;

  if (!school) {
    throw new AppError(403, 'You must have a school to create an user');
  }

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
