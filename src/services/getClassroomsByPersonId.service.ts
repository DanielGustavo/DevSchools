import { getRepository } from 'typeorm';

import Classroom from '../database/models/Classroom';
import Person from '../database/models/Person';

import AppError from '../errors/AppError';

interface Request {
  personId: string;
  requesterDatas: {
    isASchool: Boolean;
    person?: {
      id: string;
    };
    school?: {
      id: string;
    };
  };
}

export default async function getClassroomsByPersonIdService(
  request: Request
): Promise<Classroom[]> {
  const { personId, requesterDatas } = request;

  const personRepository = getRepository(Person);

  const person = await personRepository.findOne({
    where: { id: personId },
    relations: ['classrooms'],
  });

  if (!person) {
    throw new AppError(400, 'This person does not exists');
  }

  if (requesterDatas.isASchool) {
    const personIsNotRegisteredInThisSchool =
      person.school_id !== requesterDatas.school?.id;

    if (personIsNotRegisteredInThisSchool) {
      throw new AppError(403, 'This person is not registered in your school');
    }
  }

  const isNotTheOwnerOfThePersonAccount =
    requesterDatas.person?.id !== person.id;

  if (isNotTheOwnerOfThePersonAccount && !requesterDatas.isASchool) {
    throw new AppError(403, 'You can not access the classrooms of this person');
  }

  return person?.classrooms;
}
