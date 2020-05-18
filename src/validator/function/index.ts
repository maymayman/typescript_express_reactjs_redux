import { NextFunction, Request, Response } from 'express';
import { EnumMethodName, validation } from '../util';
import { schemasValidationCrawl } from './crawl';

const schemasValidation = {
  crawl: schemasValidationCrawl
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const method = req.method;
    const data = method === EnumMethodName.GET ? req.query : req.body;
    const url = req.originalUrl.split('/')[3].split('?')[0];
    const schemas = schemasValidation[url];

    await validation({ data, schema: schemas[method] });

    next();
  } catch (error) {
    throw error;
  }
};
