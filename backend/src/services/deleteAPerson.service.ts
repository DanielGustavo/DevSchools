import { getRepository } from 'typeorm';

import Person from '../database/models/Person';
import User from '../database/models/User';

import AppError from '../errors/AppError';

interface Request {
  schoolId: string;
  personId: string;
}

export default async function deleteAPersonService(request: Request) {
  const personRepository = getRepository(Person);

  const person = await personRepository.findOne(request.personId);

  if (!person) {
    throw new AppError(400, 'This person is not registered in our system');
  }

  const schoolDoesNotOwnPerson = person.school_id !== request.schoolId;

  if (schoolDoesNotOwnPerson) {
    throw new AppError(403, 'This person is not registered in your school');
  }

  const userRepository = getRepository(User);

  await userRepository.delete(person.user_id as string);

  return person;
}
