import jsonwebtoken from 'jsonwebtoken';

import User from '../database/models/User';
import Person from '../database/models/Person';

import jwtConfig from '../config/token';

interface Request {
  user: User;
  person: Person;
}

interface JWTPayload {
  subject: String;
  isASchool: Boolean;
  avatar: String | null;
  person: {
    name: String;
    id: String;
    role: String;
    schoolId: String;
  };
}

export default function createTokenToAUserOfTypePerson(request: Request) {
  const { user, person } = request;

  const jwtPayload: JWTPayload = {
    subject: user.id,
    isASchool: user.is_a_school,
    avatar: user.avatar_filename,
    person: {
      name: person.name,
      id: person.id,
      role: person.role,
      schoolId: person.school_id,
    },
  };

  const token = jsonwebtoken.sign(
    jwtPayload,
    jwtConfig.secret,
    jwtConfig.options
  );

  return token;
}
