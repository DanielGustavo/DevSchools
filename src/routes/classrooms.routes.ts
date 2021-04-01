import { Request, Response, Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';

import createClassroomService from '../services/createClassroom.service';
import insertAPersonInAClassroomService from '../services/insertAPersonInAClassroom.service';

import createClassroomValidator from '../validators/createClassroom.validator';
import insertAPersonInAClassroomValidator from '../validators/insertAPersonInAClassroom.validator';

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

export default router;
