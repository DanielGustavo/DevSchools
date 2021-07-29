import * as yup from 'yup';
import { NextFunction, Request, Response } from 'express';

import AppError from '../errors/AppError';

export default async function listHomeworksFromTeacherQueryValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const querySchema = yup.object().shape({
    classroomId: yup.string().uuid(),
    subjectId: yup.string().uuid(),
  });

  try {
    await querySchema.validate(request.query);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
