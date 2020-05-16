import * as Joi from 'joi';

export const schemasValidationCrawl = {
  create: Joi.object({
    stock_code: Joi.string().required()
  })
};
