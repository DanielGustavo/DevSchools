import { getRepository } from 'typeorm';

import Subject from '../database/models/Subject';

import AppError from '../errors/AppError';

interface Request {
  subjectId: string;
  schoolId: string;
}

export default async function deleteASubjectByIdService(request: Request) {
  const subjectRepository = getRepository(Subject);

  const subject = await subjectRepository.findOne(request.subjectId);

  if (!subject) {
    throw new AppError(400, 'This subject does not exist');
  }

  const schoolDoesNotOwnThisSubject = subject.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisSubject) {
    throw new AppError(403, 'You can not delete a subject that you do not own');
  }

  await subjectRepository.delete(subject.id);
  return subject;
}
