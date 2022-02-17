import { v4 as uuid } from 'uuid';

import getSubjectsByClassroomIdService from '../src/services/getSubjectsByClassroomId.service';
import createClassroomService from '../src/services/createClassroom.service';
import createSubjectService from '../src/services/createSubject.service';
import insertASubjectInAClassroomService from '../src/services/insertASubjectInAClassroom.service';

import {
  createPerson,
  createSchool,
  deleteClassroom,
  deleteSubject,
  deleteUser,
  random,
} from './utils';

describe('getSubjectsByClassroomIdService', () => {
  it('Should not get subjects from a classroom that does not exist', async () => {
    const subjects = getSubjectsByClassroomIdService({
      classroomId: uuid(),
      schoolId: uuid(),
    });

    expect(subjects).rejects.toHaveProperty(
      'message',
      'This classroom does not exist'
    );
  });

  it("A person should not be able to get subjects from a classroom of a school that it isn't registered in", async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const classroom = await createClassroomService({
      schoolId: school2.id,
      title: random(),
    });

    const person = await createPerson({ schoolId: school1.id });

    const subjects = getSubjectsByClassroomIdService({
      schoolId: person.school_id as string,
      classroomId: classroom.id,
    });

    expect(subjects)
      .rejects.toHaveProperty(
        'message',
        'You can not get subjects from a classroom that is not in your school'
      )
      .finally(async () => {
        await deleteClassroom(classroom.id);
        await deleteUser(person.user_id as string);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
      });
  });

  it('A school should not be able to get subjects from a classroom of another school', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const classroom = await createClassroomService({
      schoolId: school2.id,
      title: random(),
    });

    const subjects = getSubjectsByClassroomIdService({
      schoolId: school1.id,
      classroomId: classroom.id,
    });

    expect(subjects)
      .rejects.toHaveProperty(
        'message',
        'You can not get subjects from a classroom that is not in your school'
      )
      .finally(async () => {
        await deleteClassroom(classroom.id);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
      });
  });

  it('Should get the subjects from a classroom', async () => {
    const school = await createSchool();

    const classroom = await createClassroomService({
      schoolId: school.id,
      title: random(),
    });

    const subject = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    await insertASubjectInAClassroomService({
      classroomId: classroom.id,
      schoolId: school.id,
      subjectId: subject.id,
    });

    const subjects = await getSubjectsByClassroomIdService({
      schoolId: school.id,
      classroomId: classroom.id,
    });

    await deleteSubject(subject.id);
    await deleteClassroom(classroom.id);
    await deleteUser(school.user_id);

    expect(subjects.length).toBe(1);
    expect(subjects[0].id).toBe(subject.id);
  });
});
