import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';

import createUserValidator from '../validators/createUser.validator';

import schoolsController from '../controllers/schools.controller';

const router = Router();

router.post('/schools', createUserValidator, schoolsController.store);

router.get(
  '/schools/:schoolName/classrooms',
  ensureAuthorizationMiddleware,
  schoolsController.getClassroomsOfASchool
);

export default router;
