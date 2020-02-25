import { NextFunction, Request, Response } from 'express';
import * as createError from 'http-errors';
import * as Joi from 'joi';
import * as _ from 'lodash';

interface IValidations {
  schema?: Joi.ObjectSchema;
  data: object;
}

const schemasValidation = {
  post: Joi.object({
    username: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required()
  }),
  put: Joi.object({
    username: Joi.string().optional(),
    phone: Joi.string().optional(),
    password: Joi.string().optional(),
    email: Joi.string().optional()
  }),
  get: Joi.object({
    id: Joi.string().required()
  })
};

const validation = (options: IValidations): void => {
  const { schema, data } = options;

  if (!schema) return;

  const { error } = Joi.validate(data, schema);

  if (error) {
    const errorMess = _.get(error, 'details[0].message', 'Bad Request!');
    throw new createError.BadRequest(errorMess);
  }

  return;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const method = req.method;
    const body = req.body;
    const id = req.params;
    // const params = req.params;
    // const query = req.query;

    const validations = {
      POST: () => validation({ schema: schemasValidation.post, data: body }),
      PUT: () => validation({ schema: schemasValidation.put, data: body }),
      GET: () => validation({ schema: schemasValidation.get, data: id })
    };

    validations[method].call();

    next();
  } catch (error) {
    throw error;
  }
};
