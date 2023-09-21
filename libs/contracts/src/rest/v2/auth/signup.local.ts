import { IUser } from '../users';
import type { APIError } from '../error';
import { IAuthResponse } from './auth.response';

/**
 * POST /auth/signup/
 *
 * Success: 201 - User Entity, access and refresh tokens in Response Body
 *
 * Error: 400 - Bad Request, 409 - Conflict
 */
export namespace SignUpLocal {
  export const path = '/auth/signup/';

  export interface Request {
    user: IUser;

    /**
     * The password must be strong!
     *
     * Min Length 8, Min Uppercase 1, Min Symbols 1, Min Numbers 1
     */
    password: string;
  }

  /**
   * statusCode: 201 - Created
   */
  export interface Response extends IAuthResponse {}

  /**
   * statusCode:
   * 400 - validation error
   * 409 - email or username already taken
   */
  export type ResponseError = APIError<400 | 409>;
}
