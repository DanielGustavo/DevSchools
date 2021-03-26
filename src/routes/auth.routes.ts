import { Request, Response, Router } from 'express';

import createAuthenticationService from '../services/createAuthentication.service';

import authValidator from '../validators/auth.validator';

const router = Router();

router.post(
  '/auth',
  authValidator,
  async (request: Request, response: Response) => {
    const { body } = request;

    const { user, token } = await createAuthenticationService(body);

    Object.assign(user, { password: undefined });

    return response.json({ user, token });
  }
);

export default router;
