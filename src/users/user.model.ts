import * as mangoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
export type UserDocument = User & mangoose.Document;

export const UserSchema = new mangoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  salt: {
    type: String,
    require: true,
  },
});

UserSchema.methods.validateUserPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, (this as any).salt);
  return hashedPassword === (this as any).password;
};

export interface User extends mangoose.Document {
  username: string;
  password: string;
  salt: string;
  validateUserPassword: (password: string) => boolean;
}
