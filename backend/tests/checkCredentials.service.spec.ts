import checkCredentialsService from '../src/services/checkCredentials.service';

import { createSchool, deleteUser, random } from './utils';

describe('checkCredentialsService', () => {
  it('Should return a valid user', async () => {
    const password = random();
    const email = random();

    const school = await createSchool(undefined, email, password);

    const user = await checkCredentialsService({ password, email });

    await deleteUser(user.id);

    expect(user.id).toBe(school.user_id);
  });
});
