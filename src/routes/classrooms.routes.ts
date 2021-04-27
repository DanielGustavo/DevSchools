import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsASchoolMiddleware from '../middlewares/ensureIsASchool.middleware';

import createClassroomValidator from '../validators/createClassroom.validator';
import deleteAClassroomValidator from '../validators/deleteAClassroom.validator';
import insertAPersonInAClassroomValidator from '../validators/insertAPersonInAClassroom.validator';
import listPersonsRegisteredInAClassroomValidator from '../validators/listPersonsRegisteredInAClassroom.validator';
import updateAClassroomValidator from '../validators/updateAClassroom.validator';

import classroomsController from '../controllers/classrooms.controller';

const router = Router();

router.use(
  '/classrooms',
  ensureAuthorizationMiddleware,
  ensureIsASchoolMiddleware
);

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
