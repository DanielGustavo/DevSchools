import { getConnection } from 'typeorm';
import Subject from '../database/models/Subject';
import AppError from '../errors/AppError';

interface Request {
  schoolId: string;
  subjectId: string;
  classroomId: string;
}

export default async function deleteSubjectFromClassroomService(
  request: Request
) {
  const subject = await getConnection()
    .createQueryBuilder(Subject, 'subject')
    .leftJoinAndSelect(
      'subject.classrooms',
      'classroom',
      'classroom.id = :classroomId',
      { classroomId: request.classroomId }
    )
    .where('subject.id = :subjectId', { subjectId: request.subjectId })
    .getOne();

  if (!subject) {
    throw new AppError(400, 'This subject does not exist');
  }

  const schoolDoesNotOwnThisSubject = subject.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisSubject) {
    throw new AppError(403, 'Your school does not own this subject');
  }

  const classroom = subject.classrooms[0];

  if (!classroom) {
    throw new AppError(403, 'This subject is not registered in this classroom');
  }

  const schoolDoesNotOwnThisClassroom =
    classroom.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisClassroom) {
    throw new AppError(403, 'Your school does not own this classroom');
  }

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from('classrooms_subjects')
    .where('subject_id = :subjectId AND classroom_id = :classroomId', {
      classroomId: request.classroomId,
      subjectId: request.subjectId,
    })
    .execute();

  return subject;
}
