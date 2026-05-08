import Joi from 'joi';
import { LoginDTO } from '../../../../types';

export const loginSchema = Joi.object<LoginDTO>({

  password: Joi.string()
    .required()
    .messages({
      'any.required': `Password is required`,
      'string.empty': `Password is required`,
    }),
  username: Joi.string()
    .required()
    .messages({
      'any.required': `Username is required`,
      'string.empty': `Username is required`,
    }),
});

export default loginSchema;
