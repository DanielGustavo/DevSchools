import { Request, Response, Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';

import createClassroomService from '../services/createClassroom.service';
import deleteAClassroomByIdService from '../services/deleteAClassroomById.service';
import getPersonsByClassroomIdService from '../services/getPersonsByClassroomId.service';
import insertAPersonInAClassroomService from '../services/insertAPersonInAClassroom.service';
import updateAClassroomById from '../services/updateAClassroomById.service';

import createClassroomValidator from '../validators/createClassroom.validator';
import deleteAClassroomValidator from '../validators/deleteAClassroom.validator';
import insertAPersonInAClassroomValidator from '../validators/insertAPersonInAClassroom.validator';
import listPersonsRegisteredInAClassroomValidator from '../validators/listPersonsRegisteredInAClassroom.validator';
import updateAClassroomValidator from '../validators/updateAClassroom.validator';

const router = Router();

router.post(
  '/classrooms',
  ensureAuthorizationMiddleware,
  createClassroomValidator,
  async (request: Request, response: Response) => {
    const { title } = request.body;

    const classroom = await createClassroomService({
      title,
      userDatas: request.user,
    });

    return response.json(classroom);
  }
);

router.post(
  '/classrooms/:classroomId/persons',
  ensureAuthorizationMiddleware,
  insertAPersonInAClassroomValidator,
  async (request: Request, response: Response) => {
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
);

router.delete(
  '/classrooms/:classroomId',
  ensureAuthorizationMiddleware,
  deleteAClassroomValidator,
  async (request: Request, response: Response) => {
    const { classroomId } = request.params;

    const classroom = await deleteAClassroomByIdService({
      classroomId,
      userDatas: request.user,
    });

    const message = `${classroom.title} was delete successfully`;

    return response.json({ message });
  }
);

router.put(
  '/classrooms/:classroomId',
  ensureAuthorizationMiddleware,
  updateAClassroomValidator,
  async (request: Request, response: Response) => {
    const { classroomId } = request.params;

    const classroom = await updateAClassroomById({
      classroomId,
      newTitle: request.body.newTitle,
      userDatas: request.user,
    });

    return response.json(classroom);
  }
);

router.get(
  '/classrooms/:classroomId/persons',
  ensureAuthorizationMiddleware,
  listPersonsRegisteredInAClassroomValidator,
  async (request: Request, response: Response) => {
    const { classroomId } = request.params;

    const persons = await getPersonsByClassroomIdService({
      classroomId,
      userDatas: request.user,
    });

    return response.json(persons);
  }
);

export default router;
