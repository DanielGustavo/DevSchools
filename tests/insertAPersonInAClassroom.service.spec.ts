import { v4 as uuid } from 'uuid';

import createClassroomService from '../src/services/createClassroom.service';
import insertAPersonInAClassroomService from '../src/services/insertAPersonInAClassroom.service';

import {
  createPerson,
  createSchool,
  deleteClassroom,
  deleteUser,
  query,
  random,
} from './utils';

describe('insertAPersonInAClassroomService', () => {
  it('Should not insert a person in a classroom that does not exist', async () => {
    const school = await createSchool();
    const person = await createPerson({ schoolId: school.id });

    const personClassroom = insertAPersonInAClassroomService({
      classroomId: uuid(),
      personId: person.id,
      schoolId: school.id,
    });

    expect(personClassroom)
      .rejects.toHaveProperty('message', 'This classroom does not exists')
      .finally(async () => {
        await deleteUser(person.user_id as string);
        await deleteUser(school.user_id);
      });
  });

  it('A school should not be able to insert a person in a classroom that it does not own', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();
    const person = await createPerson({ schoolId: school2.id });

    const classroom = await createClassroomService({
      schoolId: school1.id,
      title: random(),
    });

    const personClassroom = insertAPersonInAClassroomService({
      classroomId: classroom.id,
      personId: person.id,
      schoolId: school2.id,
    });

    expect(personClassroom)
      .rejects.toHaveProperty(
        'message',
        'You can not insert a person in a classroom that you do not own'
      )
      .finally(async () => {
        await deleteUser(person.user_id as string);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
        await deleteClassroom(classroom.id);
      });
  });

  it('Should not insert a person that does not exist in a classroom', async () => {
    const school = await createSchool();

    const classroom = await createClassroomService({
      schoolId: school.id,
      title: random(),
    });

    const personClassroom = insertAPersonInAClassroomService({
      classroomId: classroom.id,
      personId: uuid(),
      schoolId: school.id,
    });

    expect(personClassroom)
      .rejects.toHaveProperty(
        'message',
        'This person is not registered in our system'
      )
      .finally(async () => {
        await deleteUser(school.user_id);
        await deleteClassroom(classroom.id);
      });
  });

  it('Should not insert a person in the same classroom twice or more', async () => {
    const school = await createSchool();
    const person = await createPerson({ schoolId: school.id });

    const classroom = await createClassroomService({
      schoolId: school.id,
      title: random(),
    });

    await insertAPersonInAClassroomService({
      classroomId: classroom.id,
      personId: person.id,
      schoolId: school.id,
    });

    const personClassroom = insertAPersonInAClassroomService({
      classroomId: classroom.id,
      personId: person.id,
      schoolId: school.id,
    });

    expect(personClassroom)
      .rejects.toHaveProperty(
        'message',
        'This person is already registered in this classroom'
      )
      .finally(async () => {
        await deleteUser(person.user_id as string);
        await deleteUser(school.user_id);
        await deleteClassroom(classroom.id);
      });
  });

  it('A school should not be able to insert a person registered in another school in a classroom', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();
    const person = await createPerson({ schoolId: school1.id });

    const classroom = await createClassroomService({
      schoolId: school2.id,
      title: random(),
    });

    const personClassroom = insertAPersonInAClassroomService({
      classroomId: classroom.id,
      personId: person.id,
      schoolId: school2.id,
    });

    expect(personClassroom)
      .rejects.toHaveProperty(
        'message',
        'This person is not registered in your school'
      )
      .finally(async () => {
        await deleteUser(person.user_id as string);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
        await deleteClassroom(classroom.id);
      });
  });

  it('Should insert a person in a classroom', async () => {
    const school = await createSchool();
    const person = await createPerson({ schoolId: school.id });

    const classroom = await createClassroomService({
      title: random(),
      schoolId: school.id,
    });

    await insertAPersonInAClassroomService({
      classroomId: classroom.id,
      schoolId: school.id,
      personId: person.id,
    });

    const result = (
      await query('SELECT person_id, classroom_id FROM persons_classrooms')
    )[0];

    await deleteUser(person.user_id as string);
    await deleteUser(school.user_id);
    await deleteClassroom(classroom.id);

    expect(result.person_id).toBe(person.id);
    expect(result.classroom_id).toBe(classroom.id);
  });
});
