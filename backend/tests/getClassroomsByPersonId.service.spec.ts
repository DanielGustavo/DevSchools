import { v4 as uuid } from 'uuid';

import getClassroomsByPersonIdService from '../src/services/getClassroomsByPersonId.service';
import createClassroomService from '../src/services/createClassroom.service';
import insertAPersonInAClassroomService from '../src/services/insertAPersonInAClassroom.service';

import {
  createPerson,
  createSchool,
  deleteClassroom,
  deleteUser,
  random,
} from './utils';

describe('getClassroomsByPersonIdService', () => {
  it('Should not get classrooms of a person that does not exist', async () => {
    const personId = uuid();

    const classrooms = getClassroomsByPersonIdService({
      personId,
      requesterDatas: { isASchool: false, person: { id: personId } },
    });

    expect(classrooms).rejects.toHaveProperty(
      'message',
      'This person does not exists'
    );
  });

  it("A school should not be able to get classrooms of a person that isn't registered in it", async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const person = await createPerson({ schoolId: school1.id });

    const classrooms = getClassroomsByPersonIdService({
      personId: person.id,
      requesterDatas: { isASchool: true, school: { id: school2.id } },
    });

    expect(classrooms)
      .rejects.toHaveProperty(
        'message',
        'This person is not registered in your school'
      )
      .finally(async () => {
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
        await deleteUser(person.user_id as string);
      });
  });

  it('A person should not be able to get classrooms of another person', async () => {
    const school = await createSchool();

    const person1 = await createPerson({ schoolId: school.id });
    const person2 = await createPerson({ schoolId: school.id });

    const classrooms = getClassroomsByPersonIdService({
      personId: person1.id,
      requesterDatas: { isASchool: false, person: { id: person2.id } },
    });

    expect(classrooms)
      .rejects.toHaveProperty(
        'message',
        'You can not access the classrooms of this person'
      )
      .finally(async () => {
        await deleteUser(school.user_id);
        await deleteUser(person1.user_id as string);
        await deleteUser(person2.user_id as string);
      });
  });

  it('A school should be able to get classrooms of a person that is registered in it', async () => {
    const school = await createSchool();
    const person = await createPerson({ schoolId: school.id });

    const classroom = await createClassroomService({
      schoolId: school.id,
      title: random(),
    });

    await insertAPersonInAClassroomService({
      classroomId: classroom.id,
      schoolId: school.id,
      personId: person.id,
    });

    const classrooms = await getClassroomsByPersonIdService({
      personId: person.id,
      requesterDatas: { isASchool: false, person: { id: person.id } },
    }).finally(async () => {
      await deleteUser(school.user_id);
      await deleteUser(person.user_id as string);
      await deleteClassroom(classroom.id);
    });

    expect(classrooms.length).toBe(1);
    expect(classrooms[0].id).toBe(classroom.id);
  });

  it("A person should be able to get it's own classrooms", async () => {
    const school = await createSchool();
    const person = await createPerson({ schoolId: school.id });

    const classroom = await createClassroomService({
      schoolId: school.id,
      title: random(),
    });

    await insertAPersonInAClassroomService({
      classroomId: classroom.id,
      schoolId: school.id,
      personId: person.id,
    });

    const classrooms = await getClassroomsByPersonIdService({
      personId: person.id,
      requesterDatas: { isASchool: true, school: { id: school.id } },
    });

    await deleteClassroom(classroom.id);
    await deleteUser(school.user_id);
    await deleteUser(person.user_id as string);

    expect(classrooms.length).toBe(1);
    expect(classrooms[0].id).toBe(classroom.id);
  });
});
