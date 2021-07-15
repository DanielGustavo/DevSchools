import { Router } from 'express';

import homeworksController from '../controllers/homeworks.controller';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsATeacherMiddleware from '../middlewares/ensureIsATeacher.middleware';

import createHomeworkValidator from '../validators/createHomework.validator';

const router = Router();

router.post(
  '/homeworks',
  ensureAuthorizationMiddleware,
  ensureIsATeacherMiddleware,
  createHomeworkValidator,
  homeworksController.store
);

export default router;
