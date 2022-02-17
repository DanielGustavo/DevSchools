import * as yup from 'yup';
import { NextFunction, Request, Response } from 'express';

import AppError from '../errors/AppError';

export default async function updateASubjectValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const paramsSchema = yup.object().shape({
    subjectId: yup.string().uuid(),
  });

  const bodySchema = yup.object().shape({
    newTitle: yup
      .string()
      .required('The new title is a required field')
      .min(4, 'The new title must have at least 4 characters')
      .max(100, 'The new title can not have more than 100 characters'),
  });

  try {
    await bodySchema.validate(request.body);
    await paramsSchema.validate(request.params);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
