import * as createError from 'http-errors';
import * as Joi from 'joi';
import * as _ from 'lodash';

interface IValidations {
  schema?: Joi.ObjectSchema;
  data: object;
}

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
export const validator = async (
  schemasValidation: Joi.ObjectSchema,
  body: object,
  method: string
) => {
  //   const validations = {
  //     POST: () => validation({ schema: schemasValidation.post, data: body }),
  //     PUT: () => validation({ schema: schemasValidation.put, data: body })
  //   };
  if (method === 'POST' || method === 'PUT') {
    await validation({ schema: schemasValidation, data: body });
  }

  return;
};
