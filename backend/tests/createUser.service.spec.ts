import bcrypt from 'bcrypt';

import createUserService from '../src/services/createUser.service';

import { query, random, deleteUser } from './utils';

async function createUser(
  email?: string,
  password?: string,
  isASchool?: boolean
) {
  return createUserService({
    email: email || `${random()}@gmail.com`,
    password: password || random(),
    isASchool: isASchool || false,
  });
}

describe('CreateUserService', () => {
  it('Should not create two or more user with repeated email', async () => {
    const repeatedEmail = random();

    const user1 = await createUser(repeatedEmail);
    const user2 = createUser(repeatedEmail);

    expect(user2)
      .rejects.toHaveProperty(
        'message',
        'This email already exists, try another one.'
      )
      .finally(async () => {
        await deleteUser(user1.id);
      });
  });

  it('Should hash password', async () => {
    const password = random();

    const user = await createUser(random(), password);
    const hashIsValid = await bcrypt.compare(password, user.password);

    await deleteUser(user.id);
    expect(hashIsValid).toBe(true);
  });

  it('Should create a user', async () => {
    const user = await createUser();

    const result = (await query('SELECT COUNT(*) FROM users'))[0];
    await deleteUser(user.id);

    const quantityOfUsers = parseInt(result.count, 10);
    expect(quantityOfUsers).toBe(1);
  });
});
