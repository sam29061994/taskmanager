import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUserByUsername(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const user = await this.getUserByUsername(username);
    if (user) throw new BadRequestException('username already exisit');
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({
      username,
      password: hashedPassword,
      salt,
    });
    await newUser.save();
  }

  async validateUser(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const user = await this.getUserByUsername(username);
    if (user && (await user.validateUserPassword(password))) {
      return user.username;
    }
    return null;
  }
}
