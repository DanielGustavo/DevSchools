import { v4 as uuid } from 'uuid';
import createPersonService from '../../src/services/createPerson.service';

import { random } from './index';

interface CreatePersonParams {
  name?: string;
  password?: string;
  role?: string;
  username?: string;
  schoolId?: string;
}

export default function createPerson(
  params: CreatePersonParams | undefined = undefined
) {
  return createPersonService({
    personDatas: {
      name: (params && params.name) || random(),
      password: (params && params.password) || random(),
      role: (params && params.role) || 'student',
      username: (params && params.username) || random(),
    },
    schoolId: (params && params.schoolId) || uuid(),
  });
}
