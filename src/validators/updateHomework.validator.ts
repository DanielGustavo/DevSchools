import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default async function updateHomeworkValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const schema = yup.object().shape({
    deadline: yup.number().typeError('deadline must be a number.'),
    sentAt: yup
      .number()
      .nullable()
      .typeError('sentAt must be a number or null.'),
    classroomId: yup.string().uuid(),
    subjectId: yup.string().uuid(),
    title: yup.string().min(5).max(100),
    description: yup.string().min(5).max(300),
  });

  try {
    await schema.validate(request.body);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
