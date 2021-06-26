import { getRepository } from 'typeorm';

import Person from '../database/models/Person';
import School from '../database/models/School';

import createUserService from './createUser.service';

import AppError from '../errors/AppError';

import generateRandomString from '../utils/generateRandomString';

interface Request {
  personDatas: {
    email: string;
    role: string;
    name: string;
    password: string;
  };
  schoolId: string;
}

export default async function createPersonService(
  request: Request
): Promise<Person> {
  const { personDatas, schoolId } = request;

  const schoolRepository = getRepository(School);
  const school = await schoolRepository.findOne(schoolId);

  if (!school) {
    throw new AppError(400, 'This school does not exist');
  }

  const user = await createUserService({
    email: personDatas.email,
    password: generateRandomString(18),
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
