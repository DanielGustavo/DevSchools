import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default async function updateHomeworkValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const schema = yup.object().shape({
    deadline: yup.number().required(),
    classroomId: yup.string().uuid().required(),
    subjectId: yup.string().uuid().required(),
    title: yup.string().min(5).max(100).required(),
    description: yup.string().min(5).max(300),
  });

  const paramsSchema = yup.object().shape({
    homeworkId: yup.string().uuid().required(),
  });

  try {
    await schema.validate(request.body);
    await paramsSchema.validate(request.params);
  } catch (error) {
    throw new AppError(400, error.message);
  }

  return next();
}
