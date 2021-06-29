import { Request, Response } from 'express';

import createPersonService from '../services/createPerson.service';
import deleteAPersonService from '../services/deleteAPerson.service';
import getClassroomsByPersonIdService from '../services/getClassroomsByPersonId.service';
import setupPersonService from '../services/setupPerson.service';

class PersonsController {
  async store(request: Request, response: Response) {
    const person = await createPersonService({
      personDatas: request.body,
      schoolId: request.user.school?.id as string,
    });

    Object.assign(person.user, { password: undefined });
    return response.json(person);
  }

  async delete(request: Request, response: Response) {
    const person = await deleteAPersonService({
      personId: request.params.personId,
      schoolId: request.user.school?.id as string,
    });

    return response.json(person);
  }

  async listClassroomsOfAPerson(request: Request, response: Response) {
    const { personId, page } = request.params;

    const classrooms = await getClassroomsByPersonIdService({
      requesterDatas: request.user,
      personId,
      page: parseInt(page, 10),
    });

    return response.json(classrooms);
  }

  async setup(request: Request, response: Response) {
    const { name, password } = request.body;

    const person = await setupPersonService({
      personId: request.user.person?.id as string,
      name,
      password,
    });

    Object.assign(person.user, { password: undefined });

    return response.json(person);
  }
}

export default new PersonsController();
