import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default async function answerHomeworkValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const answerSchema = yup.object().shape({
    questionId: yup.string().uuid().required(),
    alternativeId: yup.string().uuid().required(),
  });

  const schema = yup.object().shape({
    answers: yup.array().of(answerSchema).required(),
  });

  try {
    await schema.validate(request.body);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
