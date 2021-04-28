import Classroom from '../database/models/Classroom';

import AppError from '../errors/AppError';

import getSchoolByUserId from '../utils/getSchoolByUserId';

export default async function getClassroomsByUserIdOfASchool(
  userId: string
): Promise<Classroom[]> {
  const school = await getSchoolByUserId(userId);

  if (!school) {
    throw new AppError(400, 'This school does not exists');
  }

  const isNotTheOwnerOfTheSchool = userId !== school?.user_id;

  if (isNotTheOwnerOfTheSchool) {
    throw new AppError(403, 'You can not access the classrooms of this school');
  }

  return school?.classrooms;
}
