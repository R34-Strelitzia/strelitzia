import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IAuthenticatedUser, IJwtPayload } from '../interfaces';
import { EnvironmentVariables } from '@strelitzia/config-validation';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: IJwtPayload): Promise<IAuthenticatedUser> {
    if (payload.type !== 'access') {
      throw new UnauthorizedException();
    }

    return { id: payload.sub };
  }
}
