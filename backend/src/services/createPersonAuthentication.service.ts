import User from '../database/models/User';
import Person from '../database/models/Person';

import AppError from '../errors/AppError';

import getPersonByUserId from '../utils/getPersonByUserId';
import createTokenToAUserOfTypePerson from '../utils/createTokenToAUserOfTypePerson';

import checkCredentialsService from './checkCredentials.service';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
  person: Person;
}

export default async function createPersonAuthenticationService(
  request: Request
): Promise<Response> {
  const user = await checkCredentialsService(request);

  if (user.is_a_school) {
    throw new AppError(403, 'This user is not of type Person');
  }

  const person = await getPersonByUserId(user.id);

  const token = createTokenToAUserOfTypePerson({ user, person });

  return { user, person, token };
}
