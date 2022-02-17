import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default async function setupPersonValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const schema = yup.object().shape({
    name: yup.string().min(5).max(100).required(),
    password: yup.string().min(10).max(120).required(),
    passwordConfirmation: yup
      .string()
      .required('password confirmation is a required field')
      .oneOf(
        [yup.ref('password')],
        'password confirmation must be equal to the password'
      ),
  });

  try {
    await schema.validate(request.body);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
