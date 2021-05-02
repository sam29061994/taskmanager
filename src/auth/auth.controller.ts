import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    await this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    const token = await this.authService.signIn(authCredentialsDto);
    if (!token) {
      throw new UnauthorizedException('username or password incorrect');
    }
    return token;
  }
}
