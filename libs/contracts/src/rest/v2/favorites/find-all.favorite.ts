import type { APIError } from '../error';
import type { Favorite } from './favorite';

/**
 * GET /favorites/
 *
 * Required Bearer Auth
 *
 * Success: 200 - Favorite Entity List in Response Body
 *
 * Error: 403 - Forbidden, 404 - Not Found
 */
export namespace FindAllFavorite {
  export const path = '/favorites/';

  /**
   * Required Bearer Auth
   */
  export class Request {}

  /**
   * statusCode: 200 - OK
   */
  export class Response {
    favorites: Favorite[];
  }

  /**
   * statusCode:
   * 400 - validation error
   * 404 - post not in favorites
   */
  export type ResponseError = APIError<400 | 404>;
}
