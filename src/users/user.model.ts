import * as mangoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
export type UserDocument = User & mangoose.Document;

// @Schema()
// export class User {
//   @Prop({ required: true, unique: true })
//   username: string;

//   @Prop({ required: true })
//   password: string;

//   @Prop({ required: true })
//   salt: string;
// }

// export const UserSchema = SchemaFactory.createForClass(User);

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
