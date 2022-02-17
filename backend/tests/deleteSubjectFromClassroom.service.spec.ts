import { v4 as uuid } from 'uuid';

import deleteSubjectFromClassroomService from '../src/services/deleteSubjectFromClassroom.service';
import createSubjectService from '../src/services/createSubject.service';
import createClassroomService from '../src/services/createClassroom.service';
import insertASubjectInAClassroomService from '../src/services/insertASubjectInAClassroom.service';

import {
  createSchool,
  random,
  deleteUser,
  deleteSubject,
  query,
  deleteClassroom,
} from './utils';

describe('deleteSubjectFromClassroomService', () => {
  it('Should not delete a subject that does not exist from a classroom', async () => {
    const subject = deleteSubjectFromClassroomService({
      subjectId: uuid(),
      classroomId: uuid(),
      schoolId: uuid(),
    });

    expect(subject).rejects.toHaveProperty(
      'message',
      'This subject does not exist'
    );
  });

  it('School should not be able to delete a subject that it does not own from a classroom', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const classroom = await createClassroomService({
      title: random(),
      schoolId: school1.id,
    });

    const subject = await createSubjectService({
      schoolId: school1.id,
      title: random(),
    });

    await insertASubjectInAClassroomService({
      schoolId: school1.id,
      subjectId: subject.id,
      classroomId: classroom.id,
    });

    const result = deleteSubjectFromClassroomService({
      classroomId: classroom.id,
      subjectId: subject.id,
      schoolId: school2.id,
    });

    expect(result)
      .rejects.toHaveProperty(
        'message',
        'Your school does not own this subject'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteClassroom(classroom.id);
        await deleteUser(school1.user_id as string);
        await deleteUser(school2.user_id as string);
      });
  });

  it('should delete subject from classroom', async () => {
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
      schoolId: school.id,
      subjectId: subject.id,
      classroomId: classroom.id,
    });

    await deleteSubjectFromClassroomService({
      classroomId: classroom.id,
      subjectId: subject.id,
      schoolId: school.id,
    });

    const result = (await query('SELECT COUNT(*) FROM classrooms_subjects'))[0];
    const quantityOfSubjectsInClassrooms = parseInt(result.count, 10);

    await deleteSubject(subject.id);
    await deleteUser(school.user_id as string);
    await deleteClassroom(classroom.id);

    expect(quantityOfSubjectsInClassrooms).toBe(0);
  });

  it('Should not delete a subject from a classroom where it is not inserted in', async () => {
    const school = await createSchool();

    const classroom = await createClassroomService({
      schoolId: school.id,
      title: random(),
    });

    const subject = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    const result = deleteSubjectFromClassroomService({
      classroomId: classroom.id,
      subjectId: subject.id,
      schoolId: school.id,
    });

    expect(result)
      .rejects.toHaveProperty(
        'message',
        'This subject is not registered in this classroom'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteClassroom(classroom.id);
        await deleteUser(school.user_id);
      });
  });
});
