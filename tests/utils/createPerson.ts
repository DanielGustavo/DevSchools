import { v4 as uuid } from 'uuid';
import createPersonService from '../../src/services/createPerson.service';

import { random } from './index';

interface CreatePersonParams {
  name?: string;
  role?: string;
  email?: string;
  schoolId?: string;
}

export default function createPerson(
  params: CreatePersonParams | undefined = undefined
) {
  const randomEmail = `${random()}@gmail.com`;

  return createPersonService({
    personDatas: {
      name: (params && params.name) || random(),
      role: (params && params.role) || 'student',
      email: (params && params.email) || randomEmail,
    },
    schoolId: (params && params.schoolId) || uuid(),
  });
}
