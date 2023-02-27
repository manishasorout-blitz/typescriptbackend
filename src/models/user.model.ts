import { model, Schema, Document } from 'mongoose';

const UserModelSchema: Schema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    contact_number: { type: Number },
    password: { type: String },
  },
  { timestamps: true },
);

const UserModel = model<Document>('user', UserModelSchema);

export default UserModel;
