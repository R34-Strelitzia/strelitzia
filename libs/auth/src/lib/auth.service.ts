import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import {
  LoginLocal,
  RefreshJwt,
  SignUpLocal,
  User as UserViewModel,
} from '@strelitzia/contracts/v2';
import { UsersService } from '@strelitzia/users';
import { PasswordService } from './password.service';
import { IJwtPayload, IJwtRefreshPayload } from './interfaces';
import { EnvironmentVariables } from '@strelitzia/config-validation';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {}

  public async signup(dto: SignUpLocal.Request): Promise<SignUpLocal.Response> {
    const passwordHash = await this.passwordService.hash(dto.password);

    const user = await this.usersService.create({
      username: dto.user.username,
      email: dto.user.email,
      hash: passwordHash,
    });

    return this.createAuthResponse(user.id, user.username, user.email);
  }

  public async login(dto: LoginLocal.Request): Promise<LoginLocal.Response> {
    const user = await this.usersService.findByUsername(dto.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await this.passwordService.compare(
      dto.password,
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

    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_SECONDS'),
    });

    return token;
  }

  private async createRefreshToken(userId: string): Promise<string> {
    const payload = { sub: userId, type: 'refresh' } satisfies Pick<
      IJwtRefreshPayload,
      'sub' | 'type'
    >;

    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_SECONDS'),
    });

    return token;
  }
}
