import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsASchoolMiddleware from '../middlewares/ensureIsASchool.middleware';

import createClassroomValidator from '../validators/createClassroom.validator';
import deleteAClassroomValidator from '../validators/deleteAClassroom.validator';
import insertAPersonInAClassroomValidator from '../validators/insertAPersonInAClassroom.validator';
import listPersonsRegisteredInAClassroomValidator from '../validators/listPersonsRegisteredInAClassroom.validator';
import updateAClassroomValidator from '../validators/updateAClassroom.validator';
import insertASubjectInAClassroomValidator from '../validators/insertASubjectInAClassroom.validator';
import listSubjectsInsertedInAClassroomValidator from '../validators/listSubjectsInsertedInAClassroom.validator';

import classroomsController from '../controllers/classrooms.controller';

const router = Router();

router.use('/classrooms', ensureAuthorizationMiddleware);

router.get(
  '/classrooms/:classroomId/subjects',
  listSubjectsInsertedInAClassroomValidator,
  classroomsController.listSubjectsInsertedInAClassroom
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
  deleteAClassroomValidator,
  classroomsController.delete
);

router.put(
  '/classrooms/:classroomId',
  updateAClassroomValidator,
  classroomsController.edit
);

router.get(
  '/classrooms/:classroomId/persons',
  listPersonsRegisteredInAClassroomValidator,
  classroomsController.listPersonsRegisteredInAClassroom
);

export default router;
