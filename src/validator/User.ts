import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { validator } from './util';

const schemasValidation = {
  POST: Joi.object({
    username: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required()
  }),
  PUT: Joi.object({
    username: Joi.string().optional(),
    phone: Joi.string().optional(),
    password: Joi.string().optional(),
    email: Joi.string().optional()
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
