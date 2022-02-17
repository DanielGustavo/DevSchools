import { v4 as uuid } from 'uuid';

import createSubjectService from '../src/services/createSubject.service';
import insertATeacherInASubjectService from '../src/services/insertATeacherInASubject.service';

import {
  createPerson,
  createSchool,
  deleteSubject,
  deleteUser,
  query,
  random,
} from './utils';

describe('insertATeacherInASubjectService', () => {
  it('Should not insert a teacher in a subject that does not exist', async () => {
    const school = await createSchool();

    const teacher = await createPerson({
      role: 'teacher',
      schoolId: school.id,
    });

    const result = insertATeacherInASubjectService({
      personId: teacher.id,
      schoolId: school.id,
      subjectId: uuid(),
    });

    expect(result)
      .rejects.toHaveProperty('message', 'This subject does not exist')
      .finally(async () => {
        await deleteUser(teacher.user_id as string);
        await deleteUser(school.user_id);
      });
  });

  it('A school should not be able to insert a teacher in a subject of another school', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const teacher = await createPerson({
      role: 'teacher',
      schoolId: school1.id,
    });

    const subject = await createSubjectService({
      schoolId: school2.id,
      title: random(),
    });

    const result = insertATeacherInASubjectService({
      schoolId: school1.id,
      subjectId: subject.id,
      personId: teacher.id,
    });

    expect(result)
      .rejects.toHaveProperty(
        'message',
        'Your school does not own this subject'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteUser(teacher.user_id as string);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
      });
  });

  it('Should not insert a teacher that does not exist in a subject', async () => {
    const school = await createSchool();

    const subject = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    const result = insertATeacherInASubjectService({
      schoolId: school.id,
      subjectId: subject.id,
      personId: uuid(),
    });

    expect(result)
      .rejects.toHaveProperty(
        'message',
        'This person is not registered in our system'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteUser(school.user_id);
      });
  });

  it('Should not insert a non-teacher person in a subject', async () => {
    const school = await createSchool();

    const person = await createPerson({ schoolId: school.id, role: 'student' });

    const subject = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    const result = insertATeacherInASubjectService({
      schoolId: school.id,
      subjectId: subject.id,
      personId: person.id,
    });

    expect(result)
      .rejects.toHaveProperty(
        'message',
        'Only teachers can get registered in a subject'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteUser(person.user_id as string);
        await deleteUser(school.user_id);
      });
  });

  it('A school should not be able to insert a teacher of another school in a subject', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const teacher = await createPerson({
      schoolId: school1.id,
      role: 'teacher',
    });

    const subject = await createSubjectService({
      schoolId: school2.id,
      title: random(),
    });

    const result = insertATeacherInASubjectService({
      schoolId: school2.id,
      subjectId: subject.id,
      personId: teacher.id,
    });

    expect(result)
      .rejects.toHaveProperty(
        'message',
        'This teacher is not registered in your school'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteUser(teacher.user_id as string);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
      });
  });

  it('Should not insert a teacher in a subject twice or more', async () => {
    const school = await createSchool();

    const teacher = await createPerson({
      schoolId: school.id,
      role: 'teacher',
    });

    const subject = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    await insertATeacherInASubjectService({
      schoolId: school.id,
      subjectId: subject.id,
      personId: teacher.id,
    });

    const result = insertATeacherInASubjectService({
      schoolId: school.id,
      subjectId: subject.id,
      personId: teacher.id,
    });

    expect(result)
      .rejects.toHaveProperty(
        'message',
        'This teacher is already registered in this subject'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteUser(teacher.user_id as string);
        await deleteUser(school.user_id);
      });
  });

  it('Should insert a teacher in a subject', async () => {
    const school = await createSchool();

    const teacher = await createPerson({
      schoolId: school.id,
      role: 'teacher',
    });

    const subject = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    await insertATeacherInASubjectService({
      schoolId: school.id,
      subjectId: subject.id,
      personId: teacher.id,
    });

    const result = (
      await query(
        'SELECT COUNT(*) FROM persons_subjects WHERE person_id = $1 AND subject_id = $2',
        [teacher.id, subject.id]
      )
    )[0];

    const quantityOfTeachersInsertedInASubject = parseInt(result.count, 10);

    await deleteSubject(subject.id);
    await deleteUser(teacher.user_id as string);
    await deleteUser(school.user_id);

    expect(quantityOfTeachersInsertedInASubject).toBe(1);
  });
});
