import { v4 as uuid } from 'uuid';

import getTeachersBySchoolIdService from '../src/services/getTeachersBySchoolId.service';

import { createPerson, createSchool, deleteUser } from './utils';

describe('getTeachersBySchoolIdService', () => {
  it('Should not get teachers of a school that does not exist', async () => {
    const teachers = getTeachersBySchoolIdService({ schoolId: uuid() });

    expect(teachers).rejects.toHaveProperty(
      'message',
      'This school does not exist'
    );
  });

  it('Should get teachers only of the school that has the specified id', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const teacher1 = await createPerson({
      schoolId: school1.id,
      role: 'teacher',
    });
    const teacher2 = await createPerson({
      schoolId: school2.id,
      role: 'teacher',
    });

    const teachers1 = await getTeachersBySchoolIdService({
      schoolId: school1.id,
    });
    const teachers2 = await getTeachersBySchoolIdService({
      schoolId: school2.id,
    });

    await deleteUser(school1.user_id);
    await deleteUser(school2.user_id);
    await deleteUser(teacher2.user_id as string);
    await deleteUser(teacher1.user_id as string);

    expect(teachers1[0].id).toBe(teacher1.id);
    expect(teachers2[0].id).toBe(teacher2.id);
  });

  it('Should get only teachers', async () => {
    const school = await createSchool();

    const student = await createPerson({
      schoolId: school.id,
      role: 'student',
    });
    const teacher = await createPerson({
      schoolId: school.id,
      role: 'teacher',
    });

    const teachers = await getTeachersBySchoolIdService({
      schoolId: school.id,
    });

    await deleteUser(school.user_id);
    await deleteUser(student.user_id as string);
    await deleteUser(teacher.user_id as string);

    expect(teachers.length).toBe(1);
    expect(teachers[0].id).toBe(teacher.id);
  });
});
