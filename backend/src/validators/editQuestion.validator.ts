import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default async function editQuestionValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const alternativeSchema = yup.object().shape({
    id: yup.string().uuid().notRequired(),
    text: yup
      .string()
      .min(5, 'All alternatives must have at least 5 characters.')
      .max(200, 'An alternative can not have more than 200 characters.'),
    correct: yup
      .boolean()
      .typeError('The field "correct" in each alternative must be a boolean.'),
    deleted: yup
      .boolean()
      .typeError('The field "deleted" in each alternative must be a boolean.'),
  });

  const schema = yup.object().shape({
    questionTitle: yup.string().min(5).max(500),
    alternatives: yup.array().of(alternativeSchema),
  });

  try {
    await schema.validate(request.body);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
