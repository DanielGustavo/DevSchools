import { NextFunction, Request, Response } from 'express';

import AppError from '../errors/AppError';

export default async function ensureIsAStudentMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { person } = request.user;

  if (!person) {
    throw new AppError(403, 'You are not a user of type person.');
  }

  const isNotAStudent = person.role !== 'student';

  if (isNotAStudent) {
    throw new AppError(
      403,
      `You are not a student. You are registered as a ${person.role}.`
    );
  }

  next();
}
