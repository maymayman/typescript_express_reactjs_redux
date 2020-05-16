import { NextFunction, Request, Response } from 'express';
import * as createError from 'http-errors';
import * as Joi from 'joi';
import * as _ from 'lodash';
import { schemasValidationCrawl } from './crawl';
import { schemasValidationSession } from './Session';
import { schemasValidationStock } from './Stock';
import { schemasValidationTransaction } from './Transaction';
import { schemasValidationUser } from './User';
interface IValidations {
  schema?: Joi.ObjectSchema;
  data: object;
}

const enum EnumMethodName {
  POST = 'POST',
  PUT = 'PUT',
  GET = 'GET',
  DELETE = 'DELETE'
}

const funcNameMap = {
  POST: 'create',
  PUT: 'update',
  GET: 'find',
  DELETE: 'destroy',
  FIND_BY_ID: 'findById'
};

const schemasValidation = {
  users: schemasValidationUser,
  sessions: schemasValidationSession,
  stocks: schemasValidationStock,
  transactions: schemasValidationTransaction,
  crawl: schemasValidationCrawl
};

const mapFuncName = (req: Request): string => {
  const method = req.method;

  return method === EnumMethodName.GET && req.params.id
    ? funcNameMap.FIND_BY_ID
    : funcNameMap[method];
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
    const data = method === EnumMethodName.GET ? req.query : req.body;
    const url =
      req.originalUrl.split('/')[1] === 'api'
        ? _.trim(req.baseUrl, '/').split('/')[1]
        : req.originalUrl.split('/')[3].split('?')[0];
    const schemas = schemasValidation[url];
    const funcName = mapFuncName(req);

    await validation({ data, schema: schemas[funcName] });

    next();
  } catch (error) {
    throw error;
  }
};
