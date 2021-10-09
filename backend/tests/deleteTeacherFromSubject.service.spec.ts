import { v4 as uuid } from 'uuid';

import deleteTeacherFromSubjectService from '../src/services/deleteTeacherFromSubject.service';
import createSubjectService from '../src/services/createSubject.service';
import insertATeacherInASubjectService from '../src/services/insertATeacherInASubject.service';

import {
  createSchool,
  createPerson,
  random,
  deleteUser,
  deleteSubject,
  query,
} from './utils';

describe('deleteTeacherFromSubjectService', () => {
  it('Should not delete a teacher that does not exist from a subject', async () => {
    const teacher = deleteTeacherFromSubjectService({
      subjectId: uuid(),
      personId: uuid(),
      schoolId: uuid(),
    });

    expect(teacher).rejects.toHaveProperty(
      'message',
      'This teacher is not registered in our system'
    );
  });

  it('School should not be able to delete a teacher that it does not own from a subject', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const teacher = await createPerson({
      schoolId: school1.id,
      role: 'teacher',
    });

    const subject = await createSubjectService({
      schoolId: school1.id,
      title: random(),
    });

    await insertATeacherInASubjectService({
      schoolId: school1.id,
      subjectId: subject.id,
      personId: teacher.id,
    });

    const result = deleteTeacherFromSubjectService({
      personId: teacher.id,
      subjectId: subject.id,
      schoolId: school2.id,
    });

    expect(result)
      .rejects.toHaveProperty(
        'message',
        'This teacher is not registered in your school'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteUser(teacher.user_id as string);
        await deleteUser(school1.user_id as string);
        await deleteUser(school2.user_id as string);
      });
  });

  it('should delete teacher from subject', async () => {
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

    await deleteTeacherFromSubjectService({
      personId: teacher.id,
      subjectId: subject.id,
      schoolId: school.id,
    });

    const result = (await query('SELECT COUNT(*) FROM persons_subjects'))[0];
    const quantityOfTeachersInSubjects = parseInt(result.count, 10);

    await deleteSubject(subject.id);
    await deleteUser(teacher.user_id as string);
    await deleteUser(school.user_id as string);

    expect(quantityOfTeachersInSubjects).toBe(0);
  });

  it('Should not delete a teacher from a subject where it is not inserted in', async () => {
    const school = await createSchool();

    const teacher = await createPerson({
      schoolId: school.id,
      role: 'teacher',
    });

    const subject = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    const result = deleteTeacherFromSubjectService({
      personId: teacher.id,
      subjectId: subject.id,
      schoolId: school.id,
    });

    expect(result)
      .rejects.toHaveProperty(
        'message',
        'This teacher is not inserted in this subject'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteUser(teacher.user_id as string);
        await deleteUser(school.user_id);
      });
  });
});
