import { NextFunction, Request, Response } from 'express';
import * as createError from 'http-errors';
import { ERROR_CODES, HTTP_ERRORS } from '../constants';

export const validateLoginInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new createError.BadRequest(
      HTTP_ERRORS[ERROR_CODES.INVALID_USERNAME_OR_PASSWORD].MESSAGE
    );
  }

  return next();
};
