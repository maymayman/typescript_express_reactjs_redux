import * as Joi from 'joi';

export const schemasValidationStock = {
  create: Joi.object({
    stock_code: Joi.string().required(),
    stock_name: Joi.string().required(),
    stock_price: Joi.number().required()
  }),
  update: Joi.object({
    stock_code: Joi.string().optional(),
    stock_name: Joi.string().optional(),
    stock_price: Joi.number().optional()
  })
};
