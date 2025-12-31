import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtProviders } from '../utils/jwt.providers.js';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { AccountModule } from '../Account/account.module.js';
import { JwtStrategy } from '../utils/jwtStrategy.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    AccountModule,
  ],
  providers: [AuthService, JwtStrategy, ...jwtProviders],
  controllers: [AuthController],
})
export class AuthModule {}
