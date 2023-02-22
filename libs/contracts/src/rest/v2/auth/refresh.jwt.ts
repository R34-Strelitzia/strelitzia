import type { User } from '../users';
import type { APIError } from '../error';

/**
 * POST /auth/refresh/
 *
 * Required Bearer Auth with **Refresh Token**
 *
 * Success: 200 - User Entity, access and refresh tokens in Response Body
 *
 * Error: 400 - Bad Request, 401 - Unauthorized
 */
export namespace RefreshJwt {
  export const path = '/auth/refresh/';

  export class Request {}

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
   * 401 - token expired or invalid
   */
  export type ResponseError = APIError<400 | 401>;
}
