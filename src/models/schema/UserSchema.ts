// validations/userSchema.ts
import Joi from 'joi';

export const userValidationSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Invalid email',
    'any.required': 'Email is required'
  }),
  age: Joi.number().optional()
});
