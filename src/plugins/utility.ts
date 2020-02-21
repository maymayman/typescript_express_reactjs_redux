import { NextFunction, Request, Response } from 'express';
import * as createError from 'http-errors';
import isString from 'lodash/isString';

export const asyncController = fn => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    const message = isString(err) ? err : err.message;
    const error = !err.status
      ? new createError.InternalServerError(message)
      : err;

    next(error);
  });
};
