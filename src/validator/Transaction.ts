import * as Joi from 'joi';

export const schemasValidationTransaction = {
  PUT: Joi.object({
    stock_id: Joi.string().optional(),
    close_price: Joi.number().optional(),
    open_price: Joi.number().optional(),
    high_price: Joi.number().optional(),
    low_price: Joi.number().optional(),
    volume: Joi.number().optional(),
    exchange_date: Joi.date().optional()
  })
};
