import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

import setupPersonService from '../src/services/setupPerson.service';

import { createPerson, createSchool, deleteUser, random } from './utils';

interface SetupPersonRequest {
  personId?: string;
  name?: string;
  password?: string;
}

async function setupPerson(request?: SetupPersonRequest) {
  return setupPersonService({
    personId: (request && request.personId) || uuid(),
    name: (request && request.name) || random(),
    password: (request && request.password) || random(),
  });
}

describe('setupPersonService', () => {
  it('Should not setup a person that does not exist', async () => {
    const person = setupPerson();

    expect(person).rejects.toHaveProperty(
      'message',
      'This person is not registered in our system'
    );
  });

  it('Should not setup a person more than one time', async () => {
    const school = await createSchool();
    const person = await createPerson({ schoolId: school.id });

    await setupPerson({ personId: person.id });

    const personSetup = setupPerson({ personId: person.id });

    expect(personSetup)
      .rejects.toHaveProperty('message', 'Your account is setted up already')
      .finally(async () => {
        await deleteUser(school.user_id);
        await deleteUser(person.user_id as string);
      });
  });

  it('Should change the password and hash it', async () => {
    const school = await createSchool();
    const { id: personId } = await createPerson({ schoolId: school.id });

    const password = random();
    const person = await setupPerson({ personId, password });

    await deleteUser(school.user_id);
    await deleteUser(person.user_id as string);

    const hashIsValid = await bcrypt.compare(password, person.user.password);
    expect(hashIsValid).toBe(true);
  });

  it('Should be able to change the name', async () => {
    const school = await createSchool();
    const { id: personId } = await createPerson({ schoolId: school.id });

    const name = random();
    const person = await setupPerson({ personId, name });

    await deleteUser(school.user_id);
    await deleteUser(person.user_id as string);

    expect(person.name).toBe(name);
  });
});
