import { Router } from 'express';

import questionsController from '../controllers/questions.controller';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsATeacherMiddleware from '../middlewares/ensureIsATeacher.middleware';
import editQuestionValidator from '../validators/editQuestion.validator';
import hasQuestionIdInParamsValidator from '../validators/hasQuestionIdInParams.validator';

const router = Router();

router.use('/questions/:questionId', hasQuestionIdInParamsValidator);
router.use('/questions', ensureAuthorizationMiddleware);

router.get('/questions/:questionId', questionsController.listQuestion);

router.use('/questions', ensureIsATeacherMiddleware);

router.patch(
  '/questions/:questionId',
  editQuestionValidator,
  questionsController.edit
);

router.delete('/questions/:questionId', questionsController.delete);

export default router;
