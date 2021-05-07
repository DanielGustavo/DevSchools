import { v4 as uuid } from 'uuid';

import deleteAClassroomByIdService from '../src/services/deleteAClassroomById.service';
import createClassroomService from '../src/services/createClassroom.service';

import {
  createSchool,
  deleteClassroom,
  deleteUser,
  query,
  random,
} from './utils';

describe('deleteAClassroomByIdService', () => {
  it('Should not delete a classroom that does not exist', async () => {
    const classroom = deleteAClassroomByIdService({
      classroomId: uuid(),
      schoolId: uuid(),
    });

    expect(classroom).rejects.toHaveProperty(
      'message',
      'This classroom does not exist'
    );
  });

  it('A school should not be able to delete a classroom that it does not own', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const classroom = await createClassroomService({
      schoolId: school1.id,
      title: random(),
    });

    expect(
      deleteAClassroomByIdService({
        classroomId: classroom.id,
        schoolId: school2.id,
      })
    )
      .rejects.toHaveProperty(
        'message',
        'You can not delete a classroom that you do not own'
      )
      .finally(async () => {
        await deleteClassroom(classroom.id);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
      });
  });

  it('Should delete a classroom', async () => {
    const school = await createSchool();

    const classroom = await createClassroomService({
      schoolId: school.id,
      title: random(),
    });

    await deleteAClassroomByIdService({
      classroomId: classroom.id,
      schoolId: school.id,
    });

    const result = (await query('SELECT COUNT(*) FROM classrooms'))[0];
    const quantityOfClassrooms = parseInt(result.count, 10);

    await deleteUser(school.user_id);

    expect(quantityOfClassrooms).toBe(0);
  });
});
