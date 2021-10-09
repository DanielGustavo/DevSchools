import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';

import teachersController from '../controllers/teachers.controller';

import hasPersonIdInParamsValidator from '../validators/hasPersonIdInParams.validator';
import hasPageInParamsValidator from '../validators/hasPageInParams.validator';
import listHomeworksFromTeacherQueryValidator from '../validators/listHomeworksFromTeacherQuery.validator';

const router = Router();

router.use(
  '/teachers/:personId',
  ensureAuthorizationMiddleware,
  hasPersonIdInParamsValidator
);

router.get('/teachers/:personId', teachersController.listTeacher);

router.get(
  '/teachers/:personId/homeworks/:page',
  hasPageInParamsValidator,
  listHomeworksFromTeacherQueryValidator,
  teachersController.listHomeworks
);

export default router;
