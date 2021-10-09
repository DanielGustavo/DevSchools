import { v4 as uuid } from 'uuid';

import { createPerson, createSchool, deleteUser } from './utils';

import getTeacherByPersonIdService from '../src/services/getTeacherByPersonId.service';

describe('getTeacherByPersonIdService', () => {
  it('Should not list a teacher that does not exist', async () => {
    const teacher = getTeacherByPersonIdService({
      schoolId: uuid(),
      teacherId: uuid(),
    });

    expect(teacher).rejects.toHaveProperty(
      'message',
      'This teacher is not registered in our system'
    );
  });

  it('Should not list teacher of another school', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const { id: teacherId, user_id } = await createPerson({
      role: 'teacher',
      schoolId: school2.id,
    });

    const teacher = getTeacherByPersonIdService({
      teacherId,
      schoolId: school1.id,
    });

    expect(teacher)
      .rejects.toHaveProperty('message', 'This teacher is not from your school')
      .finally(async () => {
        await deleteUser(user_id as string);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
      });
  });
});
