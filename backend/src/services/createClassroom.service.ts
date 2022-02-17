import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import School from '../database/models/School';

import AppError from '../errors/AppError';

interface Request {
  title: string;
  schoolId: string;
}

export default async function createClassroomService(
  request: Request
): Promise<Classroom> {
  const { title, schoolId } = request;

  const schoolRepository = getRepository(School);
  const school = await schoolRepository.findOne(schoolId);

  if (!school) {
    throw new AppError(400, 'This school does not exist');
  }

  const classroomRepository = getRepository(Classroom);

  const schoolAlreadyHasAClassroomWithThisTitle =
    !!(await classroomRepository.findOne({
      where: { school_id: schoolId, title },
    }));

  if (schoolAlreadyHasAClassroomWithThisTitle) {
    throw new AppError(400, 'There is a classroom with this title already');
  }

  const classroom = classroomRepository.create({
    title,
    school_id: schoolId,
  });

  await classroomRepository.save(classroom);
  return classroom;
}
