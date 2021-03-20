import { Router, Request, Response } from 'express';

import createUserService from '../services/createUser.service';

const router = Router();

router.post('/users', async (request: Request, response: Response) => {
  const user = await createUserService(request.body);

  return response.json(user);
});

export default router;
