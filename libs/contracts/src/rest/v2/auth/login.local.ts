import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import type { APIError } from '../error';
import { ApiSchema } from '../decorators';
import { AuthResponse } from './auth-response';

/**
 * POST /auth/login/
 *
 * Success: 200 - User Entity, access and refresh tokens in Response Body
 *
 * Error: 400 - Bad Request, 401 - Unauthorized
 */
export namespace LoginLocal {
  export const path = '/auth/login/';

  @ApiSchema({ name: 'LoginLocalRequest' })
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
  @ApiSchema({ name: 'LoginLocalResponse' })
  export class Response extends AuthResponse {}

  /**
   * statusCode:
   * 400 - validation error
   * 401 - incorrect credentials
   */
  export type ResponseError = APIError<400 | 401>;
}
