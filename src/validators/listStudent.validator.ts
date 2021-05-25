import * as yup from 'yup';

import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default async function listStudentValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const schema = yup.object().shape({
    personId: yup.string().uuid().required(),
  });

  try {
    await schema.validate(request.params);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
