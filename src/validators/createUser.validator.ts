import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default async function createUserValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const schema = yup.object().shape({
    username: yup.string().min(5).max(100).required(),
    name: yup.string().min(5).max(100).required(),
    password: yup.string().min(10).max(120).required(),
    isASchool: yup.bool().required(),
  });

  try {
    await schema.validate(request.body);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
