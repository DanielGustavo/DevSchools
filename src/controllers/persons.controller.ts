import { Request, Response } from 'express';

import createPersonService from '../services/createPerson.service';
import getClassroomsByPersonIdService from '../services/getClassroomsByPersonId.service';

class PersonsController {
  async store(request: Request, response: Response) {
    const person = await createPersonService({
      personDatas: request.body,
      schoolId: request.user.school?.id as string,
    });

    Object.assign(person.user, { password: undefined });
    return response.json(person);
  }

  async listClassroomsOfAPerson(request: Request, response: Response) {
    const { personId } = request.params;

    const classrooms = await getClassroomsByPersonIdService({
      requesterDatas: request.user,
      personId,
    });

    return response.json(classrooms);
  }
}

export default new PersonsController();
