import { NextFunction, Request, Response } from 'express';

import AppError from '../errors/AppError';

export default async function ensureIsASchoolMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { isASchool } = request.user;

  if (!isASchool) {
    throw new AppError(403, 'You are not a user of type school');
  }

  next();
}
