import * as yup from 'yup';

import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default async function deleteTeacherFromSubjectValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const paramsSchema = yup.object().shape({
    subjectId: yup.string().uuid().required(),
    personId: yup.string().uuid().required(),
  });

  try {
    await paramsSchema.validate(request.params);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
