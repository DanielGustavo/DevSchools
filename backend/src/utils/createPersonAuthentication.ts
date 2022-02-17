import User from '../database/models/User';
import Person from '../database/models/Person';

import getPersonByUserId from './getPersonByUserId';
import createTokenToAUserOfTypePerson from './createTokenToAUserOfTypePerson';

interface Request {
  user: User;
}

interface Response {
  user: User;
  token: string;
  person: Person;
}

export default async function createPersonAuthentication(
  request: Request
): Promise<Response> {
  const { user } = request;

  const person = await getPersonByUserId(user.id);

  const token = createTokenToAUserOfTypePerson({ user, person });

  return { user, person, token };
}
