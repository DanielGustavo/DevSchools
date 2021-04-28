import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import AppError from '../errors/AppError';

import jwtConfig from '../config/token';

interface JWTPayload {
  subject: string;
  isASchool: Boolean;
  avatar: string | null;
  person?: {
    name: string;
    id: string;
    role: string;
    schoolId: string;
  };
  school?: {
    id: string;
    name: string;
  };
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
    const payload = jsonwebtoken.verify(token, jwtConfig.secret) as JWTPayload;
    const userId = payload.subject;

    Object.assign(payload, { subject: undefined });

    request.user = { id: userId, ...payload };

    next();
  } catch {
    throw new AppError(401, 'Invalid token');
  }
}
