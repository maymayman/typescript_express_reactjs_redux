import * as Joi from 'joi';

export const schemasValidationCrawl = {
  POST: Joi.object({
    stock_code: Joi.string().required()
  })
};
