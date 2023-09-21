import type { APIError } from '../error';
import { IAuthResponse } from './auth.response';

/**
 * POST /auth/login/
 *
 * Success: 200 - User Entity, access and refresh tokens in Response Body
 *
 * Error: 400 - Bad Request, 401 - Unauthorized
 */
export namespace LoginLocal {
  export const path = '/auth/login/';

  export interface Request {
    username: string;

    password: string;
  }

  /**
   * statusCode: 200 - OK
   */
  export interface Response extends IAuthResponse {}

  /**
   * statusCode:
   * 400 - validation error
   * 401 - incorrect credentials
   */
  export type ResponseError = APIError<400 | 401>;
}
