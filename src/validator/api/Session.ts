import * as Joi from 'joi';

export const schemasValidationSession = {
  create: Joi.object({
    session: Joi.string().required(),
    user_id: Joi.string().required(),
    device: Joi.string().optional(),
    device_id: Joi.string().optional()
  }),
  update: Joi.object({
    session: Joi.string().optional(),
    user_id: Joi.string().optional(),
    device: Joi.string().optional(),
    device_id: Joi.string().optional()
  })
};
