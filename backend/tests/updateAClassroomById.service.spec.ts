import { v4 as uuid } from 'uuid';

import updateAClassroomByIdService from '../src/services/updateAClassroomById.service';
import createClassroomService from '../src/services/createClassroom.service';

import {
  createSchool,
  deleteUser,
  query,
  random,
  deleteClassroom,
} from './utils';

describe('updateAClassroomByIdService', () => {
  it('Should not update a classroom that does not exist', async () => {
    const classroom = updateAClassroomByIdService({
      classroomId: uuid(),
      schoolId: uuid(),
      newTitle: random(),
    });

    expect(classroom).rejects.toHaveProperty(
      'message',
      'This classroom does not exist'
    );
  });

  it('A school should not be able to update a classroom that it does not own', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const classroom = await createClassroomService({
      schoolId: school1.id,
      title: random(),
    });

    expect(
      updateAClassroomByIdService({
        schoolId: school2.id,
        newTitle: random(),
        classroomId: classroom.id,
      })
    )
      .rejects.toHaveProperty(
        'message',
        'You can not edit a classroom that you do not own'
      )
      .finally(async () => {
        await deleteClassroom(classroom.id);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
      });
  });

  it('Should not update a classroom if the new title is already in use in the school', async () => {
    const school = await createSchool();
    const repeatedTitle = random();

    const classroom1 = await createClassroomService({
      schoolId: school.id,
      title: random(),
    });

    const classroom2 = await createClassroomService({
      schoolId: school.id,
      title: repeatedTitle,
    });

    expect(
      updateAClassroomByIdService({
        schoolId: school.id,
        classroomId: classroom1.id,
        newTitle: repeatedTitle,
      })
    )
      .rejects.toHaveProperty(
        'message',
        'There is already a classroom with this title in your school'
      )
      .finally(async () => {
        await deleteClassroom(classroom1.id);
        await deleteClassroom(classroom2.id);
        await deleteUser(school.user_id);
      });
  });

  it('Should be able to update a classroom if the title exists only in other schools', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const repeatedTitle = random();

    const classroom1 = await createClassroomService({
      schoolId: school1.id,
      title: random(),
    });

    const classroom2 = await createClassroomService({
      schoolId: school2.id,
      title: repeatedTitle,
    });

    const classroom = await updateAClassroomByIdService({
      schoolId: school1.id,
      classroomId: classroom1.id,
      newTitle: repeatedTitle,
    });

    await deleteClassroom(classroom1.id);
    await deleteClassroom(classroom2.id);
    await deleteUser(school1.user_id);
    await deleteUser(school2.user_id);

    expect(classroom.id).toBe(classroom1.id);
  });

  it('Should update a classroom', async () => {
    const school = await createSchool();
    const newTitle = random();

    const classroom = await createClassroomService({
      schoolId: school.id,
      title: random(),
    });

    await updateAClassroomByIdService({
      schoolId: school.id,
      newTitle,
      classroomId: classroom.id,
    });

    const result = (
      await query('SELECT title FROM classrooms WHERE id = $1', [classroom.id])
    )[0];

    await deleteClassroom(classroom.id);
    await deleteUser(school.user_id);

    expect(result.title).toBe(newTitle);
    expect(classroom.title).not.toBe(newTitle);
  });
});
