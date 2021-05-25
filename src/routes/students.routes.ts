import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';

import studentsController from '../controllers/students.controller';

import listStudentValidator from '../validators/listStudent.validator';

const router = Router();

router.get(
  '/students/:personId',
  ensureAuthorizationMiddleware,
  listStudentValidator,
  studentsController.listStudent
);

export default router;
