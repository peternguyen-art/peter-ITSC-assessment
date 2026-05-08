import Joi from 'joi';
import { SignupDTO } from 'src/types';

export const signupSchema = Joi.object<SignupDTO>({
  firstName: Joi.string()
    .required()
    .messages({
      'any.required': `First name is required`,
      'string.empty': `First name is required`,
    }),
  lastName: Joi.string()
    .required()
    .messages({
      'any.required': `Last name is required`,
      'string.empty': `Last name is required`,
    }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'any.required': `Password is required`,
      'string.empty': `Password is required`,
      'string.min': `Password must be at least 8 characters`,
    }),
  username: Joi.string()
    .required()
    .messages({
      'any.required': `Username is required`,
      'string.empty': `Username is required`,
    }),
});
