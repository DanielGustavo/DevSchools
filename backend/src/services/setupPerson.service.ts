import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import Person from '../database/models/Person';
import User from '../database/models/User';

import AppError from '../errors/AppError';

interface Request {
  personId: string;
  name: string;
  password: string;
}

export default async function setupPersonService(request: Request) {
  const personRepository = getRepository(Person);
  const userRepository = getRepository(User);

  const person = await personRepository.findOne({
    where: { id: request.personId },
    relations: ['user'],
  });

  if (!person) {
    throw new AppError(404, 'This person is not registered in our system');
  }

  const personIsAlreadySettedUp = person.setted_up === true;

  if (personIsAlreadySettedUp) {
    throw new AppError(403, 'Your account is setted up already');
  }

  const hashedPassword = await bcrypt.hash(request.password, 7);

  person.name = request.name;
  person.user.password = hashedPassword;
  person.setted_up = true;

  await personRepository.save(person);
  await userRepository.save(person.user);

  return person;
}
