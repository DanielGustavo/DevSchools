import { getRepository } from 'typeorm';
import Classroom from '../database/models/Classroom';
import School from '../database/models/School';
import AppError from '../errors/AppError';

interface Request {
  schoolName: string;
  userDatas: {
    id: string;
    isASchool: Boolean;
  };
}

export default async function getClassroomsBySchoolNameService(
  request: Request
): Promise<Classroom[]> {
  const { schoolName, userDatas } = request;

  const schoolRepository = getRepository(School);

  const school = await schoolRepository.findOne({
    where: { name: schoolName },
  });

  if (!school) {
    throw new AppError(400, 'This school does not exists');
  }

  const isNotTheOwnerOfTheSchool = userDatas.id !== school?.user_id;

  if (isNotTheOwnerOfTheSchool) {
    throw new AppError(403, 'You can not access the classrooms of this school');
  }

  return school?.classrooms;
}
