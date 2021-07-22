import { Router } from 'express';

import questionsController from '../controllers/questions.controller';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsATeacherMiddleware from '../middlewares/ensureIsATeacher.middleware';
import editQuestionValidator from '../validators/editQuestion.validator';
import hasQuestionIdInParamsValidator from '../validators/hasQuestionIdInParams.validator';

const router = Router();

router.use(
  '/questions',
  ensureAuthorizationMiddleware,
  ensureIsATeacherMiddleware
);

router.patch(
  '/questions/:questionId',
  hasQuestionIdInParamsValidator,
  editQuestionValidator,
  questionsController.edit
);

router.delete(
  '/questions/:questionId',
  hasQuestionIdInParamsValidator,
  questionsController.delete
);

export default router;
