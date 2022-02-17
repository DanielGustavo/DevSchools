import { v4 as uuid } from 'uuid';

import createSubjectService from '../src/services/createSubject.service';

import {
  createSchool,
  random,
  deleteUser,
  query,
  deleteSubject,
} from './utils';

describe('createSubjectService', () => {
  it('Should not be able to create a subject in a school that does not exist', async () => {
    const subject = createSubjectService({ title: random(), schoolId: uuid() });

    expect(subject).rejects.toHaveProperty(
      'message',
      'This school does not exist'
    );
  });

  it('Should not be able to create two or more subjects with repeated titles in the same school', async () => {
    const school = await createSchool();
    const repeatedTitle = random();

    const subject1 = await createSubjectService({
      schoolId: school.id,
      title: repeatedTitle,
    });

    const subject2 = createSubjectService({
      schoolId: school.id,
      title: repeatedTitle,
    });

    expect(subject2)
      .rejects.toHaveProperty(
        'message',
        'There is already a subject with this title in your school'
      )
      .finally(async () => {
        await deleteSubject(subject1.id);
        await deleteUser(school.user_id);
      });
  });

  it('Should be able to create two or more subjects with repeated titles in different schools', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const repeatedTitle = random();

    const subject1 = await createSubjectService({
      schoolId: school1.id,
      title: repeatedTitle,
    });

    const subject2 = await createSubjectService({
      schoolId: school2.id,
      title: repeatedTitle,
    });

    const result = (
      await query('SELECT COUNT(*) FROM subjects WHERE title = $1', [
        repeatedTitle,
      ])
    )[0];

    const quantityOfSubjects = parseInt(result.count, 10);

    await deleteSubject(subject1.id);
    await deleteSubject(subject2.id);
    await deleteUser(school1.user_id);
    await deleteUser(school2.user_id);

    expect(quantityOfSubjects).toBe(2);
  });

  it('Should create a subject', async () => {
    const school = await createSchool();

    const subject = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    const result = (await query('SELECT COUNT(*) FROM subjects'))[0];
    const quantityOfSubjects = parseInt(result.count, 10);

    await deleteSubject(subject.id);
    await deleteUser(school.user_id);

    expect(quantityOfSubjects).toBe(1);
  });
});
