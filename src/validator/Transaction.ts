import * as Joi from 'joi';

export const schemasValidationTransaction = {
  POST: Joi.object({
    stock_id: Joi.string().required(),
    close_price: Joi.number().required(),
    open_price: Joi.number().required(),
    high_price: Joi.number().required(),
    low_price: Joi.number().required(),
    volume: Joi.number().required(),
    exchange_date: Joi.date().required()
  })
};
