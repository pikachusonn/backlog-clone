import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const ACCESS_JWT = 'ACCESS_JWT';
export const REFRESH_JWT = 'REFRESH_JWT';

export const jwtProviders = [
  {
    provide: ACCESS_JWT,
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      const secret = config.get<string>('JWT_SECRET');
      const expiresIn = config.get<string>('ACCESS_KEY_EXPIRES_IN');

      return new JwtService({
        secret,
        signOptions: {
          expiresIn: Number(expiresIn),
        },
      });
    },
  },
  {
    provide: REFRESH_JWT,
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      const secret = config.get<string>('JWT_SECRET');
      const expiresIn = config.get<string>('REFRESH_KEY_EXPIRE_IN');

      return new JwtService({
        secret,
        signOptions: {
          expiresIn: Number(expiresIn),
        },
      });
    },
  },
];
