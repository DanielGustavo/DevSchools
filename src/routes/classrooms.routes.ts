import { Request, Response, Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';

import createClassroomService from '../services/createClassroom.service';

import createClassroomValidator from '../validators/createClassroom.validator';

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

export default router;
