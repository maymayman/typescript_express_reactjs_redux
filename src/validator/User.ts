import * as Joi from 'joi';

export const schemasValidationUser = {
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
