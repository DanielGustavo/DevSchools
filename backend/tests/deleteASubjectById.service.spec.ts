import { v4 as uuid } from 'uuid';

import deleteASubjectByIdService from '../src/services/deleteASubjectById.service';
import createSubjectService from '../src/services/createSubject.service';

import {
  createSchool,
  deleteSubject,
  deleteUser,
  query,
  random,
} from './utils';

describe('deleteASubjectByIdService', () => {
  it('Should not delete a subject that does not exist', async () => {
    const subject = deleteASubjectByIdService({
      schoolId: uuid(),
      subjectId: uuid(),
    });

    expect(subject).rejects.toHaveProperty(
      'message',
      'This subject does not exist'
    );
  });

  it('A school should not be able to delete a subject of another school', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const subject = await createSubjectService({
      schoolId: school1.id,
      title: random(),
    });

    expect(
      deleteASubjectByIdService({ schoolId: school2.id, subjectId: subject.id })
    )
      .rejects.toHaveProperty(
        'message',
        'You can not delete a subject that you do not own'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
      });
  });

  it('Should delete the subject', async () => {
    const school = await createSchool();

    const subject = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    await deleteASubjectByIdService({
      schoolId: school.id,
      subjectId: subject.id,
    });

    const result = (await query('SELECT COUNT(*) FROM subjects'))[0];
    const quantityOfSubjects = parseInt(result.count, 10);

    await deleteSubject(subject.id);
    await deleteUser(school.user_id);

    expect(quantityOfSubjects).toBe(0);
  });
});
