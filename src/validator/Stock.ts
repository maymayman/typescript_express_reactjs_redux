import * as Joi from 'joi';

export const schemasValidationStock = {
  POST: Joi.object({
    stock_code: Joi.string().required(),
    stock_name: Joi.string().required(),
    stock_price: Joi.number().required()
  })
};
