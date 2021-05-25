import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';

import teachersController from '../controllers/teachers.controller';

import listTeacherValidator from '../validators/listTeacher.validator';

const router = Router();

router.get(
  '/teachers/:personId',
  ensureAuthorizationMiddleware,
  listTeacherValidator,
  teachersController.listTeacher
);

export default router;
