import { Router } from 'express';

import homeworksController from '../controllers/homeworks.controller';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsATeacherMiddleware from '../middlewares/ensureIsATeacher.middleware';

import createHomeworkValidator from '../validators/createHomework.validator';
import deleteHomeworkValidator from '../validators/deleteHomework.validator';
import updateHomeworkValidator from '../validators/updateHomework.validator';

const router = Router();

router.use(
  '/homeworks',
  ensureAuthorizationMiddleware,
  ensureIsATeacherMiddleware
);

router.post('/homeworks', createHomeworkValidator, homeworksController.store);

router.post(
  '/homeworks/:homeworkId/questions',
  hasHomeworkIdInParamsValidator,
  addQuestionValidator,
  homeworksController.addQuestion
);

router.put(
  '/homeworks/:homeworkId',
  updateHomeworkValidator,
  homeworksController.edit
);

router.delete(
  '/homeworks/:homeworkId',
  hasHomeworkIdInParamsValidator,
  homeworksController.delete
);

export default router;
