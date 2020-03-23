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
    password: Joi.string().required()
  })
};

const validation = (options: IValidations): void => {
  const { schema, data } = options;

  if (!schema) return;

  const { error } = schema.validate(data);

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
    const validations = {
      POST: () => validation({ schema: schemasValidation.post, data: body })
    };

    if (validations[method]) {
      validations[method].call();
    }

    next();
  } catch (err) {
    throw err;
  }
};
