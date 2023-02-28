import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { authenticationConfig } from '../config';
import { IAuthenticatedUser, IJwtRefreshPayload } from '../interfaces';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    @Inject(authenticationConfig.KEY)
    private authConfig: ConfigType<typeof authenticationConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.refresh.secret,
    });
  }

  async validate(payload: IJwtRefreshPayload): Promise<IAuthenticatedUser> {
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException();
    }

    return { id: payload.sub };
  }
}
