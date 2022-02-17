import { getRepository } from 'typeorm';

import School from '../database/models/School';
import Subject from '../database/models/Subject';

import AppError from '../errors/AppError';

interface Request {
  schoolId: string;
  page?: number;
  limit?: number;
}

export default async function getSubjectsBySchoolIdService(request: Request) {
  const { page = 1, limit = 5, schoolId } = request;

  const schoolRepository = getRepository(School);

  const school = await schoolRepository.findOne(schoolId);

  if (!school) {
    throw new AppError(400, 'This school does not exist');
  }

  const subjectRepository = getRepository(Subject);

  const subjects = await subjectRepository.find({
    where: { school_id: schoolId },
    take: limit,
    skip: limit * (page - 1),
  });

  return subjects;
}
