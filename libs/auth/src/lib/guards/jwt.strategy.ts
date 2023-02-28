import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { authenticationConfig } from '../config';
import { IAuthenticatedUser, IJwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authenticationConfig.KEY)
    private authConfig: ConfigType<typeof authenticationConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.access.secret,
    });
  }

  async validate(payload: IJwtPayload): Promise<IAuthenticatedUser> {
    if (payload.type !== 'access') {
      throw new UnauthorizedException();
    }

    return { id: payload.sub };
  }
}
