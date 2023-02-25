import UserModel from '@/models/user.model';

export default class UserDao {
  private userModel = UserModel;

  public createUser = async (firstName: string, lastName: string, email: string, contactNumber: number, password: string) => {
    return await this.userModel.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      contact_number: contactNumber,
      password: password,
    });
  };

  public getUserByContactOrEmail = async (contactNumber: number, email: string) => {
    return await this.userModel.findOne({
      $or: [{ contact_number: contactNumber }, { email: email }],
    });
  };

  public getUserByEmail = async (email: string) => {
    return await this.userModel.findOne({ email });
  };
}
