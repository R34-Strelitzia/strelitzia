import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '../users';
import type { APIError } from '../error';
import { IAuthResponse } from './interfaces';

/**
 * POST /auth/login/
 *
 * Success: 200 - User Entity, access and refresh tokens in Response Body
 *
 * Error: 400 - Bad Request, 401 - Unauthorized
 */
export namespace LoginLocal {
  export const path = '/auth/login/';

  export class Request {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;
  }

  /**
   * statusCode: 200 - OK
   */
  export class Response implements IAuthResponse {
    @ApiProperty({ type: () => UserEntity })
    user: UserEntity;

    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;
  }

  /**
   * statusCode:
   * 400 - validation error
   * 401 - incorrect credentials
   */
  export type ResponseError = APIError<400 | 401>;
}
