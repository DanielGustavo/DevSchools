import { Router } from 'express';

import createPersonValidator from '../validators/createPerson.validator';
import hasPersonIdInParamsValidator from '../validators/hasPersonIdInParams.validator';
import hasPageInParamsValidator from '../validators/hasPageInParams.validator';
import setupPersonValidator from '../validators/setupPerson.validator';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsASchoolMiddleware from '../middlewares/ensureIsASchool.middleware';

import personsController from '../controllers/persons.controller';

const router = Router();

router.use('/persons', ensureAuthorizationMiddleware);

router.get(
  '/persons/:personId/classrooms/:page',
  hasPersonIdInParamsValidator,
  hasPageInParamsValidator,
  personsController.listClassroomsOfAPerson
);

router.put('/persons/setup', setupPersonValidator, personsController.setup);

router.use('/persons', ensureIsASchoolMiddleware);

router.post('/persons', createPersonValidator, personsController.store);

router.delete(
  '/persons/:personId',
  hasPersonIdInParamsValidator,
  personsController.delete
);

export default router;
