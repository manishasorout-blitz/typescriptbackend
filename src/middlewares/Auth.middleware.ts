import { NextFunction } from 'express';
import jwt from 'jsonwebtoken'
export default class AuthMiddleware{
public  authmiddleware2 = (req: any, res: any, next: NextFunction) => {
    try {
      let token = req.headers.token;
      console.log(token, 'token in middlewarein auth');
      let decode = jwt.verify(token, 'billtracker');
      console.log(decode, 'decoded token...............................................');
      req.userId = decode.user;
      next();
    } catch (error) {
      console.log(error, 'error in middleware');
    }
  };
}

