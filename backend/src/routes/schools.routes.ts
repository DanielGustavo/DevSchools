import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsASchoolMiddleware from '../middlewares/ensureIsASchool.middleware';

import createSchoolValidator from '../validators/createSchool.validator';
import hasPageInParamsValidator from '../validators/hasPageInParams.validator';

import schoolsController from '../controllers/schools.controller';

const router = Router();

router.post('/schools', createSchoolValidator, schoolsController.store);

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
  '/schools/students/:page',
  hasPageInParamsValidator,
  schoolsController.getStudentsOfTheAuthenticatedSchool
);

router.get(
  '/schools/teachers/:page',
  hasPageInParamsValidator,
  schoolsController.getTeachersOfTheAuthenticatedSchool
);

export default router;
