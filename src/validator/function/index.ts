import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { validation } from '../util';

export default ({ schema }: { schema?: Joi.ObjectSchema }) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      await validation({ data, schema });

      next();
    } catch (error) {
      throw error;
    }
  };
};
