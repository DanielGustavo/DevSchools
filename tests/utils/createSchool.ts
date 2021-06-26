import createSchoolService from '../../src/services/createSchool.service';

import { random } from './index';

export default async function createSchool(
  name?: string,
  email?: string,
  password?: string
) {
  return createSchoolService({
    name: name || random(),
    password: password || random(),
    email: email || `${random()}@gmail.com`,
  });
}
