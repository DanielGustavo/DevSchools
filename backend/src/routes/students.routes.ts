import { Router } from 'express';

import ensureAuthorizationMiddleware from '../middlewares/ensureAuthorization.middleware';
import ensureIsAStudentMiddleware from '../middlewares/ensureIsAStudent.middleware';

import studentsController from '../controllers/students.controller';

import hasPersonIdInParamsValidator from '../validators/hasPersonIdInParams.validator';
import hasHomeworkIdInParamsValidator from '../validators/hasHomeworkIdInParams.validator';
import answerHomeworkValidator from '../validators/answerHomework.validator';

const router = Router();

router.use(
  '/students/:personId',
  ensureAuthorizationMiddleware,
  hasPersonIdInParamsValidator
);

router.get('/students/:personId', studentsController.listStudent);

router.post(
  '/students/:personId/homeworks/:homeworkId',
  ensureIsAStudentMiddleware,
  hasHomeworkIdInParamsValidator,
  answerHomeworkValidator,
  studentsController.answerAHomework
);

export default router;
