import { Router } from 'express';

import questionsController from '../controllers/questions.controller';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsATeacherMiddleware from '../middlewares/ensureIsATeacher.middleware';

import hasQuestionIdInParamsValidator from '../validators/hasQuestionIdInParams.validator';

const router = Router();

router.delete(
  '/questions/:questionId',
  ensureAuthorizationMiddleware,
  ensureIsATeacherMiddleware,
  hasQuestionIdInParamsValidator,
  questionsController.delete
);

export default router;
