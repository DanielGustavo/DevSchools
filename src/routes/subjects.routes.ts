import { Router } from 'express';

import subjectsController from '../controllers/subjects.controller';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsASchoolMiddleware from '../middlewares/ensureIsASchool.middleware';

import createSubjectValidator from '../validators/createSubject.validator';

const router = Router();

router.post(
  '/subjects',
  ensureAuthorizationMiddleware,
  ensureIsASchoolMiddleware,
  createSubjectValidator,
  subjectsController.store
);

export default router;
