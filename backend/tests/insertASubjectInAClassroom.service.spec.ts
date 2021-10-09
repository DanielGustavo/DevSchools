import { v4 as uuid } from 'uuid';

import insertASubjectInAClassroomService from '../src/services/insertASubjectInAClassroom.service';
import createClassroomService from '../src/services/createClassroom.service';
import createSubjectService from '../src/services/createSubject.service';

import {
  createSchool,
  deleteClassroom,
  deleteSubject,
  deleteUser,
  query,
  random,
} from './utils';

describe('insertASubjectInAClassroomService', () => {
  it('Should not insert a subject that does not exist in a classroom', async () => {
    const result = insertASubjectInAClassroomService({
      subjectId: uuid(),
      schoolId: uuid(),
      classroomId: uuid(),
    });

    expect(result).rejects.toHaveProperty(
      'message',
      'This subject does not exist'
    );
  });

  it('A school should not be able to insert a subject that it does not own in a classroom', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const classroom = await createClassroomService({
      schoolId: school1.id,
      title: random(),
    });

    const subject = await createSubjectService({
      schoolId: school2.id,
      title: random(),
    });

    const result = insertASubjectInAClassroomService({
      schoolId: school1.id,
      subjectId: subject.id,
      classroomId: classroom.id,
    });

    expect(result)
      .rejects.toHaveProperty(
        'message',
        'Your school does not own this subject'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteClassroom(classroom.id);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
      });
  });

  it('Should not insert a subject in a classroom that does not exist', async () => {
    const school = await createSchool();

    const subject = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    const result = insertASubjectInAClassroomService({
      schoolId: school.id,
      subjectId: subject.id,
      classroomId: uuid(),
    });

    expect(result)
      .rejects.toHaveProperty('message', 'This classroom does not exist')
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteUser(school.user_id);
      });
  });

  it('A school should not be able to insert a subject in a classroom that it does not own', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const classroom = await createClassroomService({
      schoolId: school1.id,
      title: random(),
    });

    const subject = await createSubjectService({
      schoolId: school2.id,
      title: random(),
    });

    const result = insertASubjectInAClassroomService({
      schoolId: school2.id,
      subjectId: subject.id,
      classroomId: classroom.id,
    });

    expect(result)
      .rejects.toHaveProperty(
        'message',
        'Your school does not own this classroom'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteClassroom(classroom.id);
        await deleteUser(school2.user_id);
        await deleteUser(school1.user_id);
      });
  });

  it('Should insert a subject in a classroom', async () => {
    const school = await createSchool();

    const subject = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    const classroom = await createClassroomService({
      schoolId: school.id,
      title: random(),
    });

    await insertASubjectInAClassroomService({
      schoolId: school.id,
      subjectId: subject.id,
      classroomId: classroom.id,
    });

    const result = (
      await query(
        'SELECT COUNT(*) FROM classrooms_subjects WHERE classroom_id = $1 AND subject_id = $2',
        [classroom.id, subject.id]
      )
    )[0];

    const quantityOfSubjectsInsertedInAClassroom = parseInt(result.count, 10);

    await deleteSubject(subject.id);
    await deleteClassroom(classroom.id);
    await deleteUser(school.user_id);

    expect(quantityOfSubjectsInsertedInAClassroom).toBe(1);
  });

  it('Should not insert the same subject more than once in a classroom', async () => {
    const school = await createSchool();

    const subject = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    const classroom = await createClassroomService({
      schoolId: school.id,
      title: random(),
    });

    await insertASubjectInAClassroomService({
      schoolId: school.id,
      subjectId: subject.id,
      classroomId: classroom.id,
    });

    const subjectClassroom = insertASubjectInAClassroomService({
      schoolId: school.id,
      subjectId: subject.id,
      classroomId: classroom.id,
    });

    expect(subjectClassroom)
      .rejects.toHaveProperty(
        'message',
        'This subject is already registered in this classroom'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteClassroom(classroom.id);
        await deleteUser(school.user_id);
      });
  });
});
