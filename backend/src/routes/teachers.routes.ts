import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';

import teachersController from '../controllers/teachers.controller';

import hasPersonIdInParamsValidator from '../validators/hasPersonIdInParams.validator';
import hasPageInParamsValidator from '../validators/hasPageInParams.validator';

const router = Router();

router.get(
  '/teachers/:personId',
  ensureAuthorizationMiddleware,
  hasPersonIdInParamsValidator,
  teachersController.listTeacher
);

router.get(
  '/teachers/:personId/subjects/:page',
  ensureAuthorizationMiddleware,
  hasPersonIdInParamsValidator,
  hasPageInParamsValidator,
  teachersController.listSubjects
);

export default router;
