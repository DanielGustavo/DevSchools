import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import AppError from '../errors/AppError';

import jwtConfig from '../config/token';

interface JWTPayload {
  subject: string;
  isASchool: Boolean;
  iat: number;
  exp: number;
}

export default function ensureAuthorizationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization;

  if (!auth) {
    throw new AppError(401, 'Token was not provided');
  }

  const [, token] = auth.split('Bearer ');

  if (!token) {
    throw new AppError(401, 'Invalid token');
  }

  try {
    const { subject, isASchool } = jsonwebtoken.verify(
      token,
      jwtConfig.secret
    ) as JWTPayload;

    request.user = { id: subject, isASchool };

    next();
  } catch {
    throw new AppError(401, 'Invalid token');
  }
}
