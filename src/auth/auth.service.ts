import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    await this.userService.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const username = await this.userService.validateUser(authCredentialsDto);
    if (username) {
      const token = await this.jwtService.sign({ username });
      return { token };
    }
    return null;
  }
}
