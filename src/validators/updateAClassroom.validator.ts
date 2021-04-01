import * as yup from 'yup';

import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default async function updateAClassroomValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const paramsSchema = yup.object().shape({
    classroomId: yup.string().uuid().required(),
  });

  const bodySchema = yup.object().shape({
    newTitle: yup.string().min(5).max(50).required(),
  });

  try {
    await paramsSchema.validate(request.params);
    await bodySchema.validate(request.body);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
