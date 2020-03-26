import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { validator } from './util';

const schemasValidation = {
  POST: Joi.object({
    session: Joi.string().required(),
    user_id: Joi.string().required(),
    device: Joi.string().optional(),
    device_id: Joi.string().optional()
  })
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const method = req.method;
    const body = req.body;
    const schemaValidator: Joi.ObjectSchema = schemasValidation[method];

    await validator(schemaValidator, body, method);

    next();
  } catch (error) {
    throw error;
  }
};
