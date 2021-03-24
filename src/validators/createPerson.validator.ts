import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default async function createPersonValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const schema = yup.object().shape({
    role: yup.string().oneOf(['student', 'teacher']).required(),
  });

  try {
    await schema.validate(request.body);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
