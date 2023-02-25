import { z } from 'zod';

export const createUserOnSignUpRequestBodyParser = z.object({
  first_name: z.string({
    required_error: 'first_name is required',
    invalid_type_error: 'first_name must be string',
  }),
  last_name: z.string({
    required_error: 'last_name is required',
    invalid_type_error: 'last_name must be string',
  }),
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be string',
  }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be string',
  }),
  contact_number: z.string({
    required_error: 'contact_number is required',
    invalid_type_error: 'contact_number must be number',
  }),
});

export const loginUserRequestBodyParse = z.object({
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string',
  }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password is required',
  }),
});
