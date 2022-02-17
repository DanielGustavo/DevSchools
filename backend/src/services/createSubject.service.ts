import { getRepository } from 'typeorm';
import School from '../database/models/School';
import Subject from '../database/models/Subject';
import AppError from '../errors/AppError';

interface Request {
  schoolId: string;
  title: string;
}

export default async function createSubjectService(request: Request) {
  const { title, schoolId } = request;

  const schoolRepository = getRepository(School);
  const school = await schoolRepository.findOne(schoolId);

  if (!school) {
    throw new AppError(400, 'This school does not exist');
  }

  const subjectRepository = getRepository(Subject);

  const titleIsAlreadyExistsInThisSchool = !!(await subjectRepository.findOne({
    where: { title, school_id: schoolId },
  }));

  if (titleIsAlreadyExistsInThisSchool) {
    throw new AppError(
      400,
      'There is already a subject with this title in your school'
    );
  }

  const subject = subjectRepository.create({ school_id: schoolId, title });
  await subjectRepository.save(subject);

  return subject;
}
