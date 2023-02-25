import { NextFunction } from 'express';

// Services
import AuthService from '@/services/auth.service';

// typings
import { CreateUserOnSignUpRequestBody, LoginUserRequestBody } from './typings/auth.controller';

export default class AuthController {
  private authService = new AuthService();

  public createUserOnSignup = async (req: any, res: any, next: NextFunction) => {
    try {
      const { first_name: firstName, last_name: lastName, contact_number: contactNumber, email, password }: CreateUserOnSignUpRequestBody = req.body;
      await this.authService.createUserOnSignUp({ firstName, lastName, contactNumber, email, password });
      return res.sendformat({ message: 'successully registered' });
    } catch (err) {
      next(err);
    }
  };
  public loginUser = async (req: any, res: any, next: NextFunction) => {
    console.log('inside login user');
    try {
      const { email, password }: LoginUserRequestBody = req.body;
      console.log(password, '>>>>>>>>>>>>>>>>>>>>..');
      const { existinguser, token } = await this.authService.loginUserServices({ email, password });
      console.log(existinguser, '>>>>>>>>>>>>>>>>>>>>..');

      res.send({ existinguser, token });
    } catch (error) {
      next(error);
    }
  };
}
