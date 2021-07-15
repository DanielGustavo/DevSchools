import { NextFunction, Request, Response } from 'express';

import AppError from '../errors/AppError';

export default async function ensureIsATeacherMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { person } = request.user;

  if (!person) {
    throw new AppError(403, 'You are not a user of type person.');
  }

  const isNotATeacher = person.role !== 'teacher';

  if (isNotATeacher) {
    throw new AppError(
      403,
      `You are not a teacher. You are registered as a ${person.role}.`
    );
  }

  next();
}
