import * as authControllerValdators from '../validators/auth.controller.validation';
import { z } from 'zod';

export type CreateUserOnSignUpRequestBody = z.infer<typeof authControllerValdators.createUserOnSignUpRequestBodyParser>;
export type LoginUserRequestBody = z.infer<typeof authControllerValdators.loginUserRequestBodyParse>;
