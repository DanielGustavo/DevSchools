import { v4 as uuid } from 'uuid';

import createClassroomService from '../src/services/createClassroom.service';

import { createSchool, deleteUser, query, random } from './utils';

function deleteClassroom(classroomId: string) {
  return query('DELETE FROM classrooms WHERE id = $1', [classroomId]);
}

function createClassroom(schoolId?: string, title?: string) {
  return createClassroomService({
    schoolId: schoolId || uuid(),
    title: title || random(),
  });
}

describe('createClassroomService', () => {
  it('Should not be able to create a classroom in a school that does not exist', async () => {
    const classroom = createClassroom();

    expect(classroom).rejects.toHaveProperty(
      'message',
      'This school does not exist'
    );
  });

  it('Should not be able to create two or more classrooms with the same title in a school', async () => {
    const school = await createSchool();
    const repeatedTitle = random();

    const classroom1 = await createClassroom(school.id, repeatedTitle);
    const classroom2 = createClassroom(school.id, repeatedTitle);

    expect(classroom2)
      .rejects.toHaveProperty(
        'message',
        'There is a classroom with this title already'
      )
      .finally(async () => {
        await deleteUser(school.user_id);
        await deleteClassroom(classroom1.id);
      });
  });

  it('Should be able to create two or more classrooms with the same title in different schools', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const repeatedTitle = random();

    const classroom1 = await createClassroom(school1.id, repeatedTitle);
    const classroom2 = await createClassroom(school2.id, repeatedTitle);

    const result = (
      await query('SELECT COUNT(*) FROM classrooms WHERE title = $1', [
        repeatedTitle,
      ])
    )[0];

    const quantityOfClassrooms = parseInt(result.count, 10);

    expect(quantityOfClassrooms).toBe(2);

    await deleteClassroom(classroom1.id);
    await deleteClassroom(classroom2.id);
    await deleteUser(school1.user_id);
    await deleteUser(school2.user_id);
  });

  it('Should create a classroom', async () => {
    const school = await createSchool();

    const classroom = await createClassroom(school.id);

    const result = (await query('SELECT COUNT(*) FROM classrooms'))[0];
    const quantityOfClassrooms = parseInt(result.count, 10);

    await deleteClassroom(classroom.id);
    await deleteUser(school.user_id);

    expect(quantityOfClassrooms).toBe(1);
  });
});
