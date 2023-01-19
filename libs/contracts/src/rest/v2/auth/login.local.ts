import { IsString } from 'class-validator';
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

  export class Request {
    @IsString()
    username: string;

    @IsString()
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
   * 401 - incorrect credentials
   */
  export type ResponseError = APIError<400 | 401>;
}
