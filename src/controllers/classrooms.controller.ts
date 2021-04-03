import { Request, Response } from 'express';

import createClassroomService from '../services/createClassroom.service';
import deleteAClassroomByIdService from '../services/deleteAClassroomById.service';
import getPersonsByClassroomIdService from '../services/getPersonsByClassroomId.service';
import insertAPersonInAClassroomService from '../services/insertAPersonInAClassroom.service';
import updateAClassroomById from '../services/updateAClassroomById.service';

class ClassroomsController {
  async store(request: Request, response: Response) {
    const { title } = request.body;

    const classroom = await createClassroomService({
      title,
      userDatas: request.user,
    });

    return response.json(classroom);
  }

  async delete(request: Request, response: Response) {
    const { classroomId } = request.params;

    const classroom = await deleteAClassroomByIdService({
      classroomId,
      userDatas: request.user,
    });

    const message = `${classroom.title} was delete successfully`;
    return response.json({ message });
  }

  async edit(request: Request, response: Response) {
    const { classroomId } = request.params;

    const classroom = await updateAClassroomById({
      classroomId,
      newTitle: request.body.newTitle,
      userDatas: request.user,
    });

    return response.json(classroom);
  }

  async insertAPersonInAClassroom(request: Request, response: Response) {
    const { classroomId } = request.params;
    const { personId } = request.body;
    const userDatas = request.user;

    const {
      person,
      school,
      classroom,
    } = await insertAPersonInAClassroomService({
      classroomId,
      userDatas,
      personId,
    });

    const message = `${person.name} was inserted in the classroom "${classroom.title}" of "${school.name}"`;
    return response.json({ message });
  }

  async listPersonsRegisteredInAClassroom(
    request: Request,
    response: Response
  ) {
    const { classroomId } = request.params;

    const persons = await getPersonsByClassroomIdService({
      classroomId,
      userDatas: request.user,
    });

    return response.json(persons);
  }
}

export default new ClassroomsController();
