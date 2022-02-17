import { v4 as uuid } from 'uuid';

import updateASubjectByIdService from '../src/services/updateASubjectById.service';
import createSubjectService from '../src/services/createSubject.service';

import {
  createSchool,
  deleteSubject,
  deleteUser,
  query,
  random,
} from './utils';

describe('updateASubjectByIdService', () => {
  it('A school should not be able to update a subject of another school', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const subject = await createSubjectService({
      schoolId: school1.id,
      title: random(),
    });

    expect(
      updateASubjectByIdService({
        schoolId: school2.id,
        subjectId: subject.id,
        newTitle: random(),
      })
    )
      .rejects.toHaveProperty(
        'message',
        'You can not edit a subject that you do not own'
      )
      .finally(async () => {
        await deleteSubject(subject.id);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
      });
  });

  it('Should not update subject if the new title already exists in the school', async () => {
    const school = await createSchool();
    const newTitle = random();

    const subject1 = await createSubjectService({
      schoolId: school.id,
      title: newTitle,
    });

    const { id: subjectId } = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    const subject2 = updateASubjectByIdService({
      schoolId: school.id,
      subjectId,
      newTitle,
    });

    expect(subject2)
      .rejects.toHaveProperty(
        'message',
        'There is already a subject with this title in your school'
      )
      .finally(async () => {
        await deleteSubject(subject1.id);
        await deleteSubject(subjectId);
        await deleteUser(school.user_id);
      });
  });

  it('Should not update the subject if the new title is equal to the old one', async () => {
    const school = await createSchool();
    const newTitle = random();

    const { id: subjectId } = await createSubjectService({
      schoolId: school.id,
      title: newTitle,
    });

    const subject = updateASubjectByIdService({
      schoolId: school.id,
      subjectId,
      newTitle,
    });

    expect(subject)
      .rejects.toHaveProperty(
        'message',
        'The new title should not be equal to the old one'
      )
      .finally(async () => {
        await deleteSubject(subjectId);
        await deleteUser(school.user_id);
      });
  });

  it('Should not update a subject that does not exist', async () => {
    const subject = updateASubjectByIdService({
      newTitle: random(),
      schoolId: uuid(),
      subjectId: uuid(),
    });

    expect(subject).rejects.toHaveProperty(
      'message',
      'This subject does not exist'
    );
  });

  it('Should update a subject', async () => {
    const school = await createSchool();
    const newTitle = random();

    const { id: subjectId } = await createSubjectService({
      schoolId: school.id,
      title: random(),
    });

    await updateASubjectByIdService({
      schoolId: school.id,
      subjectId,
      newTitle,
    });

    const subject = (
      await query('SELECT * FROM subjects WHERE id = $1', [subjectId])
    )[0];

    await deleteSubject(subjectId);
    await deleteUser(school.user_id);

    expect(subject.title).toBe(newTitle);
  });
});
