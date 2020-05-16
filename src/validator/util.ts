import * as createError from 'http-errors';
import * as Joi from 'joi';
import * as _ from 'lodash';
interface IValidations {
  schema?: Joi.ObjectSchema;
  data: object;
}

export const enum EnumMethodName {
  POST = 'POST',
  PUT = 'PUT',
  GET = 'GET',
  DELETE = 'DELETE'
}

export const validation = (options: IValidations): void => {
  const { schema, data } = options;

  if (!schema) return;

  const { error } = Joi.validate(data, schema);

  if (error) {
    const errorMess = _.get(error, 'details[0].message', 'Bad Request!');
    throw new createError.BadRequest(errorMess);
  }

  return;
};
