import { getRepository } from 'typeorm';

import Subject from '../database/models/Subject';

import AppError from '../errors/AppError';

interface Request {
  schoolId: string;
  subjectId: string;
  newTitle: string;
}

export default async function updateASubjectByIdService(request: Request) {
  const { subjectId, schoolId, newTitle } = request;
  const subjectRepository = getRepository(Subject);

  const subject = await subjectRepository.findOne({ where: { id: subjectId } });

  if (!subject) {
    throw new AppError(400, 'This subject does not exist');
  }

  const isNotTheOwnerOfThisSubject = subject.school_id !== schoolId;

  if (isNotTheOwnerOfThisSubject) {
    throw new AppError(400, 'You can not edit a subject that you do not own');
  }

  const titleIsTheSame = subject.title === newTitle;

  if (titleIsTheSame) {
    throw new AppError(403, 'The new title should not be equal to the old one');
  }

  const titleAlreadyExistsInThisSchool = await subjectRepository.findOne({
    where: { title: newTitle, school_id: schoolId },
  });

  if (titleAlreadyExistsInThisSchool) {
    throw new AppError(
      403,
      'There is already a subject with this title in your school'
    );
  }

  subject.title = newTitle;
  await subjectRepository.save(subject);

  return subject;
}
