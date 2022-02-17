import * as yup from 'yup';

import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default async function deletePersonFromClassroomValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const paramsSchema = yup.object().shape({
    classroomId: yup.string().uuid().required(),
    personId: yup.string().uuid().required(),
  });

  try {
    await paramsSchema.validate(request.params);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
