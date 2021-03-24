import { getRepository } from 'typeorm';

import Person from '../database/models/Person';

import createUserService from './createUser.service';

interface Request {
  username: string;
  role: string;
  name: string;
  password: string;
}

export default async function createPersonService(
  request: Request
): Promise<Person> {
  const personRepository = getRepository(Person);

  const user = await createUserService({
    ...request,
    isASchool: false,
  });

  const person = personRepository.create({
    role: request.role,
    name: request.name,
    user,
  });

  await personRepository.save(person);
  return person;
}
