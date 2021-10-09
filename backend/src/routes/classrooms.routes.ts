import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsASchoolMiddleware from '../middlewares/ensureIsASchool.middleware';

import createClassroomValidator from '../validators/createClassroom.validator';
import insertAPersonInAClassroomValidator from '../validators/insertAPersonInAClassroom.validator';
import updateAClassroomValidator from '../validators/updateAClassroom.validator';
import insertASubjectInAClassroomValidator from '../validators/insertASubjectInAClassroom.validator';
import hasClassroomIdInParamsValidator from '../validators/hasClassroomIdInParams.validator';
import deletePersonFromClassroomValidator from '../validators/deletePersonFromClassroom.validator';
import deleteSubjectFromClassroomValidator from '../validators/deleteSubjectFromClassroom.validator';
import hasPageInParamsValidator from '../validators/hasPageInParams.validator';

import classroomsController from '../controllers/classrooms.controller';

const router = Router();

router.use('/classrooms', ensureAuthorizationMiddleware);

router.get(
  '/classrooms/:classroomId/subjects/:page',
  hasClassroomIdInParamsValidator,
  hasPageInParamsValidator,
  classroomsController.listSubjectsInsertedInAClassroom
);

router.get(
  '/classrooms/:classroomId',
  hasClassroomIdInParamsValidator,
  classroomsController.listClassroom
);

router.use('/classrooms', ensureIsASchoolMiddleware);

router.post(
  '/classrooms',
  createClassroomValidator,
  classroomsController.store
);

router.post(
  '/classrooms/:classroomId/persons',
  insertAPersonInAClassroomValidator,
  classroomsController.insertAPersonInAClassroom
);

router.post(
  '/classrooms/:classroomId/subjects',
  insertASubjectInAClassroomValidator,
  classroomsController.insertASubjectInAClassroom
);

router.delete(
  '/classrooms/:classroomId',
  hasClassroomIdInParamsValidator,
  classroomsController.delete
);

router.delete(
  '/classrooms/:classroomId/persons/:personId',
  deletePersonFromClassroomValidator,
  classroomsController.deletePersonFromClassroom
);

router.delete(
  '/classrooms/:classroomId/subjects/:subjectId',
  deleteSubjectFromClassroomValidator,
  classroomsController.deleteSubjectFromClassroom
);

router.put(
  '/classrooms/:classroomId',
  updateAClassroomValidator,
  classroomsController.edit
);

router.get(
  '/classrooms/:classroomId/persons/:page',
  hasClassroomIdInParamsValidator,
  hasPageInParamsValidator,
  classroomsController.listPersonsRegisteredInAClassroom
);

export default router;
