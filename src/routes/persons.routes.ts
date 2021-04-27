import { Router } from 'express';

import createPersonValidator from '../validators/createPerson.validator';
import createUserValidator from '../validators/createUser.validator';
import listClassroomsOfAPersonValidator from '../validators/listClassroomsOfAPerson.validator';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsASchoolMiddleware from '../middlewares/ensureIsASchool.middleware';

import personsController from '../controllers/persons.controller';

const router = Router();

router.use('/persons', ensureAuthorizationMiddleware);

router.post(
  '/persons',
  ensureIsASchoolMiddleware,
  createUserValidator,
  createPersonValidator,
  personsController.store
);

router.get(
  '/persons/:personId/classrooms',
  listClassroomsOfAPersonValidator,
  personsController.listClassroomsOfAPerson
);

export default router;
