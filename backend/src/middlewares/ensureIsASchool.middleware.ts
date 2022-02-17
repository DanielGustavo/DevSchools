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

  if (!request.user.school) {
    throw new AppError(
      400,
      'Your token does not offer the necessary datas, try to authenticate again'
    );
  }

  next();
}
