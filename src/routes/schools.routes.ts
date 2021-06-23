import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsASchoolMiddleware from '../middlewares/ensureIsASchool.middleware';

import createUserValidator from '../validators/createUser.validator';
import hasPageInParamsValidator from '../validators/hasPageInParams.validator';

import schoolsController from '../controllers/schools.controller';

const router = Router();

router.post('/schools', createUserValidator, schoolsController.store);

router.use('/schools', ensureAuthorizationMiddleware);

router.get(
  '/schools/subjects/:page',
  hasPageInParamsValidator,
  schoolsController.getSubjectsOfTheAuthenticatedSchool
);

router.get(
  '/schools/classrooms/:page',
  hasPageInParamsValidator,
  schoolsController.getClassroomsOfTheAuthenticatedSchool
);

router.use('/schools', ensureIsASchoolMiddleware);

router.get(
  '/schools/students',
  schoolsController.getStudentsOfTheAuthenticatedSchool
);

router.get(
  '/schools/teachers',
  schoolsController.getTeachersOfTheAuthenticatedSchool
);

export default router;
