import { Router, Request, Response } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';

import createSchoolService from '../services/createSchool.service';
import getClassroomsBySchoolName from '../services/getClassroomsBySchoolName.service';

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

router.get(
  '/schools/:schoolName/classrooms',
  ensureAuthorizationMiddleware,
  async (request: Request, response: Response) => {
    const classrooms = await getClassroomsBySchoolName({
      schoolName: request.params.schoolName,
      userDatas: request.user,
    });

    return response.json(classrooms);
  }
);

export default router;
