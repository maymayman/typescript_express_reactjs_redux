import { NextFunction, Request, Response } from 'express';
import * as createError from 'http-errors';
import * as Joi from 'joi';
import * as _ from 'lodash';
import { schemasValidationSession } from './Session';
import { schemasValidationStock } from './Stock';
import { schemasValidationTransaction } from './Transaction';
import { schemasValidationUser } from './User';

interface IValidations {
  schema?: Joi.ObjectSchema;
  data: object;
}

const schemasValidation = {
  users: schemasValidationUser,
  sessions: schemasValidationSession,
  stocks: schemasValidationStock,
  transactions: schemasValidationTransaction
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
const validator = async (
  schemasValidations: Joi.ObjectSchema,
  body: object,
  method: string
) => {
  if (method === 'POST' || method === 'PUT') {
    await validation({ schema: schemasValidations, data: body });
  }

  return;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const method = req.method;
    const body = req.body;
    const url = _.trim(req.baseUrl, '/');
    const schemas = schemasValidation[url];

    await validator(schemas[method], body, method);

    next();
  } catch (error) {
    throw error;
  }
};
