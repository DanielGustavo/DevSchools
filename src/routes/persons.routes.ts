import { Router, Request, Response } from 'express';

import createPersonValidator from '../validators/createPerson.validator';
import createUserValidator from '../validators/createUser.validator';

import createPersonService from '../services/createPerson.service';

const router = Router();

router.post(
  '/persons',
  createUserValidator,
  createPersonValidator,
  async (request: Request, response: Response) => {
    const person = await createPersonService(request.body);

    Object.assign(person.user, { id: undefined, password: undefined });

    return response.json(person);
  }
);

export default router;
