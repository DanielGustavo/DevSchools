import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';

import teachersController from '../controllers/teachers.controller';

import hasPersonIdInParamsValidator from '../validators/hasPersonIdInParams.validator';

const router = Router();

router.get(
  '/teachers/:personId',
  ensureAuthorizationMiddleware,
  hasPersonIdInParamsValidator,
  teachersController.listTeacher
);

export default router;
