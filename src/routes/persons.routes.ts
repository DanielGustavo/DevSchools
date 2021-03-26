import { Router, Request, Response } from 'express';

import createPersonValidator from '../validators/createPerson.validator';
import createUserValidator from '../validators/createUser.validator';

import createPersonService from '../services/createPerson.service';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';

const router = Router();

router.post(
  '/persons',
  ensureAuthorizationMiddleware,
  createUserValidator,
  createPersonValidator,
  async (request: Request, response: Response) => {
    const person = await createPersonService({
      personDatas: request.body,
      creatorDatas: request.user,
    });

    Object.assign(person.user, { id: undefined, password: undefined });

    return response.json(person);
  }
);

export default router;
