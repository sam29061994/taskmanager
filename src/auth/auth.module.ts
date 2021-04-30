import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JWTStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'ILOVEJWT',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [JWTStrategy],
})
export class AuthModule {}
