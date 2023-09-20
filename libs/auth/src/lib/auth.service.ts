import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  LoginLocal,
  RefreshJwt,
  SignUpLocal,
  IUser as UserViewModel,
} from '@strelitzia/contracts/v2';
import { UsersService } from '@strelitzia/users';

import { authenticationConfig } from './config';
import { PasswordService } from './password.service';
import { IJwtPayload, IJwtRefreshPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    @Inject(authenticationConfig.KEY)
    private readonly authConfig: ConfigType<typeof authenticationConfig>
  ) {}

  public async signup(
    signupDTO: SignUpLocal.Request
  ): Promise<SignUpLocal.Response> {
    const passwordHash = await this.passwordService.hash(signupDTO.password);

    const user = await this.usersService.create({
      username: signupDTO.user.username,
      email: signupDTO.user.email,
      hash: passwordHash,
    });

    return this.createAuthResponse(user.id, user.username, user.email);
  }

  public async login(
    loginDTO: LoginLocal.Request
  ): Promise<LoginLocal.Response> {
    const user = await this.usersService.findByUsername(loginDTO.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await this.passwordService.compare(
      loginDTO.password,
      user.hash
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    return this.createAuthResponse(user.id, user.username, user.email);
  }

  public async refresh(userId: string): Promise<RefreshJwt.Response> {
    const user = await this.usersService.findById(userId);

    return this.createAuthResponse(user.id, user.username, user.email);
  }

  private async createAuthResponse(
    userId: string,
    username: string,
    email: string
  ) {
    const accessToken = await this.createAccessToken(userId);
    const refreshToken = await this.createRefreshToken(userId);

    const user = {
      email,
      username,
    } satisfies UserViewModel;

    return { user, accessToken, refreshToken };
  }

  private async createAccessToken(userId: string): Promise<string> {
    const payload = { sub: userId, type: 'access' } satisfies Pick<
      IJwtPayload,
      'sub' | 'type'
    >;

    const token = await this.jwtService.signAsync(
      payload,
      this.authConfig.access
    );

    return token;
  }

  private async createRefreshToken(userId: string): Promise<string> {
    const payload = { sub: userId, type: 'refresh' } satisfies Pick<
      IJwtRefreshPayload,
      'sub' | 'type'
    >;

    const token = await this.jwtService.signAsync(
      payload,
      this.authConfig.refresh
    );

    return token;
  }
}
