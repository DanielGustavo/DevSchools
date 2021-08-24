import { v4 as uuid } from 'uuid';

import { createSchool, deleteClassroom, deleteUser, random } from './utils';

import getClassroomByIdService from '../src/services/getClassroomById.service';
import createClassroomService from '../src/services/createClassroom.service';

describe('getClassroomByIdService', () => {
  it('Should not list a classroom that does not exist', async () => {
    const classroom = getClassroomByIdService({
      schoolId: uuid(),
      classroomId: uuid(),
    });

    expect(classroom).rejects.toHaveProperty(
      'message',
      'This classroom does not exist'
    );
  });

  it('School should not be able to list a classroom of another school', async () => {
    const school1 = await createSchool();
    const school2 = await createSchool();

    const { id: classroomId } = await createClassroomService({
      schoolId: school1.id,
      title: random(),
    });

    const classroom = getClassroomByIdService({
      schoolId: school2.id,
      classroomId,
    });

    expect(classroom)
      .rejects.toHaveProperty(
        'message',
        'Your school does not own this classroom'
      )
      .finally(async () => {
        await deleteClassroom(classroomId);
        await deleteUser(school1.user_id);
        await deleteUser(school2.user_id);
      });
  });
});
