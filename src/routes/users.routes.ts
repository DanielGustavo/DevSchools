import { Router, Request, Response } from 'express';

import createUserService from '../services/createUser.service';

import createUserValidator from '../validators/createUser.validator';

const router = Router();

router.post(
  '/users',
  createUserValidator,
  async (request: Request, response: Response) => {
    const user = await createUserService(request.body);

    return response.json(user);
  }
);

export default router;
