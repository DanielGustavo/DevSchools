import { v4 as uuid } from 'uuid';

import deletePersonFromClassroomService from '../src/services/deletePersonFromClassroom.service';
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

describe('deletePersonFromClassroomService', () => {
  it('Should not delete a person that does not exist from a classroom', async () => {
    const person = deletePersonFromClassroomService({
      classroomId: uuid(),
      personId: uuid(),
      schoolId: uuid(),
    });

    expect(person).rejects.toHaveProperty(
      'message',
      'This person is not registered in our system'
    );
  });

  it('School should not be able to delete a person that it does not own from a classroom', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const person = await createPerson({ schoolId: school1.id });

    const classroom = await createClassroomService({
      schoolId: school1.id,
      title: random(),
    });

    await insertAPersonInAClassroomService({
      schoolId: school1.id,
      classroomId: classroom.id,
      personId: person.id,
    });

    const result = deletePersonFromClassroomService({
      personId: person.id,
      classroomId: classroom.id,
      schoolId: school2.id,
    });

    expect(result)
      .rejects.toHaveProperty(
        'message',
        'This person is not registered in your school'
      )
      .finally(async () => {
        await deleteClassroom(classroom.id);
        await deleteUser(person.user_id as string);
        await deleteUser(school1.user_id as string);
        await deleteUser(school2.user_id as string);
      });
  });

  it('should delete person from classroom', async () => {
    const school = await createSchool();

    const person = await createPerson({ schoolId: school.id });

    const classroom = await createClassroomService({
      schoolId: school.id,
      title: random(),
    });

    await insertAPersonInAClassroomService({
      schoolId: school.id,
      classroomId: classroom.id,
      personId: person.id,
    });

    await deletePersonFromClassroomService({
      personId: person.id,
      classroomId: classroom.id,
      schoolId: school.id,
    });

    const result = (await query('SELECT COUNT(*) FROM persons_classrooms'))[0];
    const quantityOfPersonsInClassrooms = parseInt(result.count, 10);

    await deleteClassroom(classroom.id);
    await deleteUser(person.user_id as string);
    await deleteUser(school.user_id as string);

    expect(quantityOfPersonsInClassrooms).toBe(0);
  });

  it('Should not delete a person from a classroom where it is not inserted in', async () => {
    const school = await createSchool();

    const person = await createPerson({ schoolId: school.id });

    const classroom = await createClassroomService({
      schoolId: school.id,
      title: random(),
    });

    const result = deletePersonFromClassroomService({
      personId: person.id,
      classroomId: classroom.id,
      schoolId: school.id,
    });

    expect(result)
      .rejects.toHaveProperty(
        'message',
        'This person is not inserted in this classroom'
      )
      .finally(async () => {
        await deleteClassroom(classroom.id);
        await deleteUser(person.user_id as string);
        await deleteUser(school.user_id);
      });
  });
});
