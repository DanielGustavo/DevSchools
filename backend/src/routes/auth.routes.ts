import { Router } from 'express';

import authValidator from '../validators/auth.validator';

import authController from '../controllers/auth.controller';

const router = Router();

router.post('/auth/schools', authValidator, authController.authenticateSchool);
router.post('/auth/persons', authValidator, authController.authenticatePerson);

export default router;
