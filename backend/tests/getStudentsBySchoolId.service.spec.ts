import { v4 as uuid } from 'uuid';

import getStudentsBySchoolIdService from '../src/services/getStudentsBySchoolId.service';

import { createPerson, createSchool, deleteUser } from './utils';

describe('getStudentsBySchoolIdService', () => {
  it('Should not get students of a school that does not exist', async () => {
    const students = getStudentsBySchoolIdService({ schoolId: uuid() });

    expect(students).rejects.toHaveProperty(
      'message',
      'This school does not exist'
    );
  });

  it('Should get students only of the school that has the specified id', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const student1 = await createPerson({
      schoolId: school1.id,
      role: 'student',
    });
    const student2 = await createPerson({
      schoolId: school2.id,
      role: 'student',
    });

    const students1 = await getStudentsBySchoolIdService({
      schoolId: school1.id,
    });
    const students2 = await getStudentsBySchoolIdService({
      schoolId: school2.id,
    });

    await deleteUser(school1.user_id);
    await deleteUser(school2.user_id);
    await deleteUser(student2.user_id as string);
    await deleteUser(student1.user_id as string);

    expect(students1[0].id).toBe(student1.id);
    expect(students2[0].id).toBe(student2.id);
  });

  it('Should get only students', async () => {
    const school = await createSchool();

    const student = await createPerson({
      schoolId: school.id,
      role: 'student',
    });
    const teacher = await createPerson({
      schoolId: school.id,
      role: 'teacher',
    });

    const students = await getStudentsBySchoolIdService({
      schoolId: school.id,
    });

    await deleteUser(school.user_id);
    await deleteUser(student.user_id as string);
    await deleteUser(teacher.user_id as string);

    expect(students.length).toBe(1);
    expect(students[0].id).toBe(student.id);
  });
});
