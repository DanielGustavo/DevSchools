import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import AppError from '../errors/AppError';

export default async function authValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  try {
    await schema.validate(request.body);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
