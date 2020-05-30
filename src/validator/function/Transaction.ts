import * as Joi from 'joi';

export const crawlSchema = Joi.object({
  stock_code: Joi.string().required()
});
