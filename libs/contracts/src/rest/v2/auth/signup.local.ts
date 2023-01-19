import { IsEmail, IsStrongPassword, Length } from 'class-validator';
import type { APIError } from '../error';
import type { User } from '../users';

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
    @Length(4, 20)
    username: string;

    @IsEmail()
    email: string;

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
