import createSchoolService from '../../src/services/createSchool.service';

import { random } from './index';

export default async function createSchool(
  name?: string,
  username?: string,
  password?: string
) {
  return createSchoolService({
    name: name || random(),
    password: password || random(),
    username: username || random(),
  });
}
