import { getConnection, getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import Person from '../database/models/Person';

import AppError from '../errors/AppError';

interface Request {
  personId: string;
  schoolId: string;
}

export default async function getStudentByPersonIdService(request: Request) {
  const personRepository = getRepository(Person);

  const student = await personRepository.findOne({
    where: { id: request.personId, role: 'student' },
  });

  if (!student) {
    throw new AppError(400, 'This student is not registered in our system');
  }

  const schoolDoesNotOwnThisStudent = student.school_id !== request.schoolId;

  if (schoolDoesNotOwnThisStudent) {
    throw new AppError(403, 'This student is not from your school');
  }

  student.classrooms = await getConnection()
    .createQueryBuilder(Classroom, 'classroom')
    .leftJoinAndSelect(
      'persons_classrooms',
      'pc',
      'pc.classroom_id = classroom.id AND pc.person_id = :personId',
      { personId: request.personId }
    )
    .take(5)
    .where('pc.person_id = :personId', { personId: request.personId })
    .getMany();

  return student;
}
