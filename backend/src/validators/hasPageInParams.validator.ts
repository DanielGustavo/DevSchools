import * as yup from 'yup';

import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default async function hasPageInParamsValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const schema = yup.object().shape({
    page: yup.number().min(1).required(),
  });

  try {
    await schema.validate(request.params);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
