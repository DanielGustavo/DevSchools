import { Router } from 'express';

import homeworksController from '../controllers/homeworks.controller';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsATeacherMiddleware from '../middlewares/ensureIsATeacher.middleware';

import createHomeworkValidator from '../validators/createHomework.validator';
import updateHomeworkValidator from '../validators/updateHomework.validator';
import hasHomeworkIdInParamsValidator from '../validators/hasHomeworkIdInParams.validator';
import addQuestionValidator from '../validators/addQuestion.validator';

const router = Router();

router.use('/homeworks', ensureAuthorizationMiddleware);

router.get(
  '/homeworks/:homeworkId',
  hasHomeworkIdInParamsValidator,
  homeworksController.listHomework
);

router.use('/homeworks', ensureIsATeacherMiddleware);

router.post('/homeworks', createHomeworkValidator, homeworksController.store);

router.post(
  '/homeworks/:homeworkId/questions',
  hasHomeworkIdInParamsValidator,
  addQuestionValidator,
  homeworksController.addQuestion
);

router.patch(
  '/homeworks/:homeworkId',
  hasHomeworkIdInParamsValidator,
  updateHomeworkValidator,
  homeworksController.edit
);

router.delete(
  '/homeworks/:homeworkId',
  hasHomeworkIdInParamsValidator,
  homeworksController.delete
);

export default router;
