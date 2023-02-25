// modules
import bcrypt, { compare, hash } from 'bcrypt';

// Dao
import UserDao from '@/dao/user.dao';
import { HandledError } from '@/exceptions/HandledError';
import { sign } from 'jsonwebtoken';

export default class AuthService {
  private userDao = new UserDao();
  public createUserOnSignUp = async ({
    firstName,
    lastName,
    email,
    contactNumber,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: number;
    password: string;
  }) => {
    // check if user already exists
    const existingUser = await this.userDao.getUserByContactOrEmail(contactNumber, email);

    if (existingUser) {
      throw new HandledError(`User Already Exists`);
    }
    const passwordHash = await hash(password, 7);

    // create user
    await this.userDao.createUser(firstName, lastName, email, contactNumber, passwordHash);
    return;
  };
  public loginUserServices = async ({ email, password }: { email: string; password: string }) => {
    const existinguser = await this.userDao.getUserByEmail(email);
    console.log(existinguser.password, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    if (!existinguser) {
      throw new HandledError('please signin first');
    }

    console.log(existinguser.password, 'existing usere>>>>>>>');
    const passwordCheck = await compare(password, existinguser.password);
    console.log(passwordCheck, 'password check >>>>>>>>>>>>>>>>>>>>>>>///////////////');
    if (!passwordCheck) {
      throw new HandledError('user with given credentials doest not exists');
    }
    const token: string = sign({ user: existinguser._id }, 'biiltracker');
    return { existinguser, token };
  };
}
