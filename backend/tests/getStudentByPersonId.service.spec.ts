import { v4 as uuid } from 'uuid';

import { createPerson, createSchool, deleteUser } from './utils';

import getStudentByPersonIdService from '../src/services/getStudentByPersonId.service';

describe('getStudentByPersonIdService', () => {
  it('Should not list a student that does not exist', async () => {
    const student = getStudentByPersonIdService({
      schoolId: uuid(),
      personId: uuid(),
    });

    expect(student).rejects.toHaveProperty(
      'message',
      'This student is not registered in our system'
    );
  });

  it('Should not list student of another school', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const { id: personId, user_id } = await createPerson({
      role: 'student',
      schoolId: school2.id,
    });

    const student = getStudentByPersonIdService({
      personId,
      schoolId: school1.id,
    });

    expect(student)
      .rejects.toHaveProperty('message', 'This student is not from your school')
      .finally(async () => {
        await deleteUser(user_id as string);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
      });
  });
});
