import { query, deleteUser, random, createSchool, createPerson } from './utils';

describe('CreatePersonService', () => {
  it('Should not create a person in a school that does not exist', async () => {
    const person = createPerson();

    await expect(person).rejects.toHaveProperty(
      'message',
      'This school does not exist'
    );
  });
  it('Should be able to create two or more person with the same name', async () => {
    const school = await createSchool();

    const repeatedName = random();

    const person1 = await createPerson({
      name: repeatedName,
      schoolId: school.id,
    });
    const person2 = await createPerson({
      name: repeatedName,
      schoolId: school.id,
    });

    const result = (
      await query('SELECT COUNT(*) FROM persons WHERE name = $1', [
        repeatedName,
      ])
    )[0];

    const quantityOfPersons = parseInt(result.count, 10);

    await deleteUser(person1.user_id as string);
    await deleteUser(person2.user_id as string);
    await deleteUser(school.user_id);

    expect(quantityOfPersons).toBe(2);
  });

  it('Should create a person', async () => {
    const school = await createSchool();

    const person = await createPerson({
      schoolId: school.id,
    });

    const result = (await query('SELECT COUNT(*) FROM persons'))[0];
    const quantityOfPersons = parseInt(result.count, 10);

    await deleteUser(person.user_id as string);
    await deleteUser(school.user_id);

    expect(quantityOfPersons).toBe(1);
  });

  it('Should send an email after registering a person', async () => {
    console.log = jest.fn();

    const school = await createSchool();
    const person = await createPerson({
      schoolId: school.id,
    });

    await deleteUser(person.user_id as string);
    await deleteUser(school.user_id);

    expect(console.log).toHaveBeenCalledWith('Sending email 📬...');
  });

  it('Should not send an email if person could not be registered due to some error', async () => {
    const email = random();

    const school = await createSchool();
    console.log = jest.fn();

    const person1 = await createPerson({
      schoolId: school.id,
      email,
    });

    const person2 = createPerson({
      schoolId: school.id,
      email,
    });

    await expect(person2)
      .rejects.toHaveProperty(
        'message',
        'This email already exists, try another one.'
      )
      .finally(async () => {
        await deleteUser(person1.user_id as string);
        await deleteUser(school.user_id);
      });

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Sending email 📬...');
  });
});
