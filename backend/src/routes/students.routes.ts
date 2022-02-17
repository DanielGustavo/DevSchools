import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';

import studentsController from '../controllers/students.controller';

import hasPersonIdInParamsValidator from '../validators/hasPersonIdInParams.validator';

const router = Router();

router.get(
  '/students/:personId',
  ensureAuthorizationMiddleware,
  hasPersonIdInParamsValidator,
  studentsController.listStudent
);

export default router;
