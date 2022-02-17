import { random, deleteUser, query, createSchool } from './utils';

describe('CreateSchoolService', () => {
  it('Should not create two or more schools with the same name', async () => {
    const repeatedName = random();

    const school1 = await createSchool(repeatedName);
    const school2 = createSchool(repeatedName);

    expect(school2)
      .rejects.toHaveProperty(
        'message',
        'This name already exists, try another one'
      )
      .finally(async () => {
        await deleteUser(school1.user_id);
      });
  });

  it('Should create a school', async () => {
    const school = await createSchool();

    const result = (await query('SELECT COUNT(*) FROM schools'))[0];
    await deleteUser(school.user_id);

    const quantityOfSchools = parseInt(result.count, 10);
    expect(quantityOfSchools).toBe(1);
  });
});
