import { NextFunction } from 'express';

// Services
import AuthService from '@/services/auth.service';

// typings
import { CreateUserOnSignUpRequestBody, LoginUserRequestBody } from './typings/auth.controller';

export default class AuthController {
  private authService = new AuthService();

  //creating a user 
  public createUserOnSignup = async (req: any, res: any, next: NextFunction) => {
    try {
      const { first_name: firstName, last_name: lastName, contact_number: contactNumber, email, password }: CreateUserOnSignUpRequestBody = req.body;
      await this.authService.createUserOnSignUp({ firstName, lastName, contactNumber, email, password });
      return res.sendformat({ message: 'successully registered' });
    } catch (err) {
      next(err);
    }
  };

  //login 
  public loginUser = async (req: any, res: any, next: NextFunction) => {
   
    try {
      const { email, password }: LoginUserRequestBody = req.body;
     
      const { existinguser, token } = await this.authService.loginUserServices({ email, password });    

      res.send({ existinguser, token });
    } catch (error) {
      next(error);
    }
  };
}
