import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { EnumMethodName, validation } from '../util';
import { schemasValidationSession } from './Session';
import { schemasValidationStock } from './Stock';
import { schemasValidationTransaction } from './Transaction';
import { schemasValidationUser } from './User';

const schemasValidation = {
  users: schemasValidationUser,
  sessions: schemasValidationSession,
  stocks: schemasValidationStock,
  transactions: schemasValidationTransaction
};
const funcNameMap = {
  POST: 'create',
  PUT: 'update',
  GET: 'find',
  DELETE: 'destroy',
  FIND_BY_ID: 'findById'
};

const mapFuncName = (req: Request): string => {
  const method = req.method;

  return method === EnumMethodName.GET && req.params.id
    ? funcNameMap.FIND_BY_ID
    : funcNameMap[method];
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const method = req.method;
    const data = method === EnumMethodName.GET ? req.query : req.body;
    const url = _.trim(req.originalUrl, '/').split('/');
    const table = url[1].split('?')[0];
    const schemas = schemasValidation[table];

    const funcName = mapFuncName(req);

    await validation({ data, schema: schemas[funcName] });

    next();
  } catch (error) {
    throw error;
  }
};
