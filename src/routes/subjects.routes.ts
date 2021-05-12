import { Router } from 'express';

import subjectsController from '../controllers/subjects.controller';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsASchoolMiddleware from '../middlewares/ensureIsASchool.middleware';

import createSubjectValidator from '../validators/createSubject.validator';

const router = Router();

router.use(
  '/subjects',
  ensureAuthorizationMiddleware,
  ensureIsASchoolMiddleware
);

router.post('/subjects', createSubjectValidator, subjectsController.store);

router.put(
  '/subjects/:subjectId',
  subjectsController.edit
);

export default router;
