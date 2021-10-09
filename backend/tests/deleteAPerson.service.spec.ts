import { v4 as uuid } from 'uuid';

import deleteAPersonService from '../src/services/deleteAPerson.service';

import { createPerson, createSchool, deleteUser, query, random } from './utils';

describe('deleteAPersonService', () => {
  it('Should not delete a person that does not exist', async () => {
    const person = deleteAPersonService({
      schoolId: uuid(),
      personId: uuid(),
    });

    expect(person).rejects.toHaveProperty(
      'message',
      'This person is not registered in our system'
    );
  });

  it('A School should not be able to delete a person of another school', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const { id: personId, user_id } = await createPerson({
      schoolId: school1.id,
    });

    const person = deleteAPersonService({
      schoolId: school2.id,
      personId,
    });

    expect(person)
      .rejects.toHaveProperty(
        'message',
        'This person is not registered in your school'
      )
      .finally(async () => {
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
        await deleteUser(user_id as string);
      });
  });

  it("Should delete the person and it's user", async () => {
    const school = await createSchool();

    const { id: personId } = await createPerson({
      schoolId: school.id,
    });

    await deleteAPersonService({
      schoolId: school.id,
      personId,
    });

    const { users_quantity, persons_quantity } = (
      await query(
        'SELECT COUNT(*) AS users_quantity, (SELECT COUNT (*) AS persons_quantity FROM persons) FROM users'
      )
    )[0];

    await deleteUser(school.user_id);

    expect(parseInt(users_quantity, 10)).toBe(1);
    expect(parseInt(persons_quantity, 10)).toBe(0);
  });
});
