import { Router } from 'express';

import subjectsController from '../controllers/subjects.controller';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsASchoolMiddleware from '../middlewares/ensureIsASchool.middleware';

const router = Router();

router.post(
  '/subjects',
  ensureAuthorizationMiddleware,
  ensureIsASchoolMiddleware,
  subjectsController.store
);

export default router;
