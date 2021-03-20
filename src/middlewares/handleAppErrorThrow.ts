import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

import AppError from '../errors/AppError';

export default function handleAppErrorThrow(
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  _: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.code).json({ error: error.message });
  }

  return response.status(500).json({ error: 'Internal Server Error' });
}
