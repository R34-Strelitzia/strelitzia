import type { APIError } from '../error';
import type { User } from '../users';

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
  export interface Response {
    user: User;
    accessToken: string;
    refreshToken: string;
  }

  /**
   * statusCode:
   * 400 - validation error
   * 401 - incorrect credentials
   */
  export type ResponseError = APIError<400 | 401>;
}
