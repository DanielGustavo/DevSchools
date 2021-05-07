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
});
