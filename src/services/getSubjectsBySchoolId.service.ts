import { getRepository } from 'typeorm';

import School from '../database/models/School';
import Subject from '../database/models/Subject';

import AppError from '../errors/AppError';

interface Request {
  schoolId: string;
}

export default async function getSubjectsBySchoolIdService(request: Request) {
  const schoolRepository = getRepository(School);

  const school = await schoolRepository.findOne(request.schoolId);

  if (!school) {
    throw new AppError(400, 'This school does not exist');
  }

  const subjectRepository = getRepository(Subject);

  const subjects = await subjectRepository.find({
    where: { school_id: request.schoolId },
  });

  return subjects;
}
