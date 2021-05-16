import { Router } from 'express';

import subjectsController from '../controllers/subjects.controller';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsASchoolMiddleware from '../middlewares/ensureIsASchool.middleware';

import createSubjectValidator from '../validators/createSubject.validator';
import updateASubjectValidator from '../validators/updateASubject.validator';
import deleteASubjectValidator from '../validators/deleteASubject.validator';
import insertATeacherInASubjectValidator from '../validators/insertATeacherInASubject.validator';

const router = Router();

router.use(
  '/subjects',
  ensureAuthorizationMiddleware,
  ensureIsASchoolMiddleware
);

router.post('/subjects', createSubjectValidator, subjectsController.store);

router.post(
  '/subjects/:subjectId/teachers',
  insertATeacherInASubjectValidator,
  subjectsController.insertATeacherInASubject
);

router.put(
  '/subjects/:subjectId',
  updateASubjectValidator,
  subjectsController.edit
);

router.delete(
  '/subjects/:subjectId',
  deleteASubjectValidator,
  subjectsController.delete
);

export default router;
