import { Request, Response } from 'express';

import createPersonService from '../services/createPerson.service';
import getClassroomsByPersonIdService from '../services/getClassroomsByPersonId.service';

class PersonsController {
  async store(request: Request, response: Response) {
    const person = await createPersonService({
      personDatas: request.body,
      creatorDatas: request.user,
    });

    Object.assign(person.user, { id: undefined, password: undefined });
    return response.json(person);
  }

  async listClassroomsOfAPerson(request: Request, response: Response) {
    const { personId } = request.params;

    const classrooms = await getClassroomsByPersonIdService({
      userDatas: request.user,
      personId,
    });

    return response.json(classrooms);
  }
}

export default new PersonsController();
