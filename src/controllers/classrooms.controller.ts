import { Request, Response } from 'express';

import createClassroomService from '../services/createClassroom.service';
import deleteAClassroomByIdService from '../services/deleteAClassroomById.service';
import getPersonsByClassroomIdService from '../services/getPersonsByClassroomId.service';
import insertAPersonInAClassroomService from '../services/insertAPersonInAClassroom.service';
import updateAClassroomByIdService from '../services/updateAClassroomById.service';

class ClassroomsController {
  async store(request: Request, response: Response) {
    const { title } = request.body;

    const classroom = await createClassroomService({
      title,
      schoolId: request.user.school?.id as string,
    });

    return response.json(classroom);
  }

  async delete(request: Request, response: Response) {
    const { classroomId } = request.params;

    const classroom = await deleteAClassroomByIdService({
      classroomId,
      schoolId: request.user.school?.id as string,
    });

    const message = `${classroom.title} was delete successfully`;
    return response.json({ message });
  }

  async edit(request: Request, response: Response) {
    const { classroomId } = request.params;

    const classroom = await updateAClassroomByIdService({
      classroomId,
      newTitle: request.body.newTitle,
      schoolId: request.user.school?.id as string,
    });

    return response.json(classroom);
  }

  async insertAPersonInAClassroom(request: Request, response: Response) {
    const { classroomId } = request.params;
    const { personId } = request.body;

    const { person, classroom } = await insertAPersonInAClassroomService({
      classroomId,
      schoolId: request.user.school?.id as string,
      personId,
    });

    Object.assign(person, { classrooms: undefined });

    return response.json({
      person,
      classroom,
    });
  }

  async listPersonsRegisteredInAClassroom(
    request: Request,
    response: Response
  ) {
    const { classroomId } = request.params;

    const persons = await getPersonsByClassroomIdService({
      classroomId,
      schoolId: request.user.school?.id as string,
    });

    return response.json(persons);
  }
}

export default new ClassroomsController();
