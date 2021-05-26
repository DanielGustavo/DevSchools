import { Router } from 'express';

import createPersonValidator from '../validators/createPerson.validator';
import createUserValidator from '../validators/createUser.validator';
import deleteAPersonValidator from '../validators/deleteAPerson.validator';
import hasPersonIdInParamsValidator from '../validators/hasPersonIdInParams.validator';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsASchoolMiddleware from '../middlewares/ensureIsASchool.middleware';

import personsController from '../controllers/persons.controller';

const router = Router();

router.use('/persons', ensureAuthorizationMiddleware);

router.get(
  '/persons/:personId/classrooms',
  hasPersonIdInParamsValidator,
  personsController.listClassroomsOfAPerson
);

router.use('/persons', ensureIsASchoolMiddleware);

router.post(
  '/persons',
  createUserValidator,
  createPersonValidator,
  personsController.store
);

router.delete(
  '/persons/:personId',
  deleteAPersonValidator,
  personsController.delete
);

export default router;
