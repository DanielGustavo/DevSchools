import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';

import createClassroomValidator from '../validators/createClassroom.validator';
import deleteAClassroomValidator from '../validators/deleteAClassroom.validator';
import insertAPersonInAClassroomValidator from '../validators/insertAPersonInAClassroom.validator';
import listPersonsRegisteredInAClassroomValidator from '../validators/listPersonsRegisteredInAClassroom.validator';
import updateAClassroomValidator from '../validators/updateAClassroom.validator';

import classroomsController from '../controllers/classrooms.controller';

const router = Router();

router.post(
  '/classrooms',
  ensureAuthorizationMiddleware,
  createClassroomValidator,
  classroomsController.store
);

router.post(
  '/classrooms/:classroomId/persons',
  ensureAuthorizationMiddleware,
  insertAPersonInAClassroomValidator,
  classroomsController.insertAPersonInAClassroom
);

router.delete(
  '/classrooms/:classroomId',
  ensureAuthorizationMiddleware,
  deleteAClassroomValidator,
  classroomsController.delete
);

router.put(
  '/classrooms/:classroomId',
  ensureAuthorizationMiddleware,
  updateAClassroomValidator,
  classroomsController.edit
);

router.get(
  '/classrooms/:classroomId/persons',
  ensureAuthorizationMiddleware,
  listPersonsRegisteredInAClassroomValidator,
  classroomsController.listPersonsRegisteredInAClassroom
);

export default router;
