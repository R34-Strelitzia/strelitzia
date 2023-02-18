import { Type } from 'class-transformer';
import { IsStrongPassword, ValidateNested } from 'class-validator';

import { User } from '../users';
import type { APIError } from '../error';

/**
 * POST /auth/signup/
 *
 * Success: 200 - User Entity, access and refresh tokens in Response Body
 *
 * Error: 400 - Bad Request, 409 - Conflict
 */
export namespace SignUpLocal {
  export const path = '/auth/signup/';

  export class Request {
    @ValidateNested()
    @Type(() => User)
    user: User;

    /**
     * The password must be strong!
     *
     * Min Length 8, Min Uppercase 1, Min Symbols 1, Min Numbers 1
     */
    @IsStrongPassword()
    password: string;
  }

  /**
   * statusCode: 200 - OK
   */
  export class Response {
    user: User;
    accessToken: string;
    refreshToken: string;
  }

  /**
   * statusCode:
   * 400 - validation error
   * 409 - email or username already taken
   */
  export type ResponseError = APIError<400 | 409>;
}
