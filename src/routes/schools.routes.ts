import { Router, Request, Response } from 'express';

import createSchoolService from '../services/createSchool.service';

import createUserValidator from '../validators/createUser.validator';

const router = Router();

router.post(
  '/schools',
  createUserValidator,
  async (request: Request, response: Response) => {
    const school = await createSchoolService(request.body);

    Object.assign(school.user, { password: undefined, id: undefined });

    return response.json(school);
  }
);

export default router;
