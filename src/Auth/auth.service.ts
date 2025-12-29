/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_JWT, REFRESH_JWT } from '../utils/jwt.providers.js';
import { LoginRequestDto } from './dto/loginRequest.dto.js';
import { AccountService } from '../Account/account.service.js';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
    @Inject(ACCESS_JWT) private readonly accessJwt: JwtService,
    @Inject(REFRESH_JWT) private readonly refreshJwt: JwtService,
  ) {}

  async login(loginRequestDto: LoginRequestDto) {
    const { email, password } = loginRequestDto;
    const account = await this.accountService.findAccountByEmail(email);
    if (!account) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, account.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: account.id,
      email: account.email,
    };

    const accessToken = await this.accessJwt.signAsync(payload);
    const refreshToken = await this.refreshJwt.signAsync(payload);

    return {
      accessToken,
      refreshToken,
      account,
    };
  }
}
