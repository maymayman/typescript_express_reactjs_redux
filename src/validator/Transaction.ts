import * as Joi from 'joi';

export const schemasValidationTransaction = {
  create: Joi.object({
    stock_id: Joi.string().required(),
    close_price: Joi.number().required(),
    open_price: Joi.number().required(),
    high_price: Joi.number().required(),
    low_price: Joi.number().required(),
    volume: Joi.number().required(),
    exchange_date: Joi.date().required()
  }),
  update: Joi.object({
    stock_id: Joi.string().optional(),
    close_price: Joi.number().optional(),
    open_price: Joi.number().optional(),
    high_price: Joi.number().optional(),
    low_price: Joi.number().optional(),
    volume: Joi.number().optional(),
    exchange_date: Joi.date().optional()
  })
};
