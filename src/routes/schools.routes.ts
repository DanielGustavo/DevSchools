import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsASchoolMiddleware from '../middlewares/ensureIsASchool.middleware';

import createUserValidator from '../validators/createUser.validator';

import schoolsController from '../controllers/schools.controller';

const router = Router();

router.post('/schools', createUserValidator, schoolsController.store);

router.use(
  '/schools',
  ensureAuthorizationMiddleware,
  ensureIsASchoolMiddleware
);

router.get(
  '/schools/classrooms',
  schoolsController.getClassroomsOfTheAuthenticatedSchool
);

router.get(
  '/schools/students',
  schoolsController.getStudentsOfTheAuthenticatedSchool
);

router.get(
  '/schools/teachers',
  schoolsController.getTeachersOfTheAuthenticatedSchool
);

export default router;
