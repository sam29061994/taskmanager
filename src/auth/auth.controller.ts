import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';

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

  @Post('/test')
  @UseGuards(AuthGuard())
  async test(@GetUser() user) {
    console.log(user);
  }
}
