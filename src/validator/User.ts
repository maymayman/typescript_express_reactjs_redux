import { NextFunction, Request, Response } from 'express';
import * as createError from 'http-errors';
import * as Joi from 'joi';
import * as _ from 'lodash';

interface IValidationSave {
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
  })
};

const validations = {
  post: (options: IValidationSave): void => {
    const { schema, data } = options;

    if (!schema) return;

    const { error } = Joi.validate(data, schema);

    if (error) {
      const errorMess = _.get(error, 'details[0].message', 'Bad Request!');
      throw new createError.BadRequest(errorMess);
    }

    return;
  },
  put: (options: IValidationSave): void => {
    const { schema, data } = options;

    if (!schema) return;

    const { error } = Joi.validate(data, schema);

    if (error) {
      const errorMess = _.get(error, 'details[0].message', 'Bad Request!');
      throw new createError.BadRequest(errorMess);
    }

    return;
  }
};

export default {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = schemasValidation.post;
      const data = req.body;

      validations.post({ schema, data });

      next();
    } catch (error) {
      throw error;
    }
  },

  put: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = schemasValidation.put;
      const data = req.body;

      validations.put({ schema, data });

      next();
    } catch (error) {
      throw error;
    }
  }
};
