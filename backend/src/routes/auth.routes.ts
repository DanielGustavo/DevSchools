import { Router } from 'express';

import authValidator from '../validators/auth.validator';

import authController from '../controllers/auth.controller';

const router = Router();

router.post('/auth', authValidator, authController.authenticate);

export default router;
