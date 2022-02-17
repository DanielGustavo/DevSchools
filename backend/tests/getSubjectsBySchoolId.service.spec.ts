import { v4 as uuid } from 'uuid';

import getSubjectsBySchoolIdService from '../src/services/getSubjectsBySchoolId.service';
import createSubjectService from '../src/services/createSubject.service';

import { createSchool, deleteSubject, deleteUser, random } from './utils';

describe('getSubjectsBySchoolIdService', () => {
  it('Should not get subjects of a school that does not exist', async () => {
    const subjects = getSubjectsBySchoolIdService({ schoolId: uuid() });

    expect(subjects).rejects.toHaveProperty(
      'message',
      'This school does not exist'
    );
  });

  it('Should only get subjects from the school that has the specified id', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const subject1 = await createSubjectService({
      schoolId: school1.id,
      title: random(),
    });
    const subject2 = await createSubjectService({
      schoolId: school2.id,
      title: random(),
    });

    const subjects = await getSubjectsBySchoolIdService({
      schoolId: school1.id,
    });

    await deleteSubject(subject1.id);
    await deleteSubject(subject2.id);
    await deleteUser(school1.user_id);
    await deleteUser(school2.user_id);

    expect(subjects.length).toBe(1);
    expect(subjects[0].school_id).toBe(school1.id);
  });
});
