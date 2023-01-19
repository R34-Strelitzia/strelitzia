import type { APIError } from '../error';
import type { Favorite } from './favorite';

/**
 * POST /favorites/:id
 *
 * Required Bearer Auth
 *
 * Success: 200 - Favorite Entity in Response Body
 *
 * Error: 403 - Forbidden, 409 - Conflict
 */
export namespace AddFavorite {
  /**
   * Required preset **id** param, like **"/favorites/:id"**
   */
  export const path = '/favorites/';

  /**
   * Required Bearer Auth
   */
  export class Request {}

  /**
   * statusCode: 200 - OK
   */
  export class Response {
    favorite: Favorite;
  }

  /**
   * statusCode:
   * 400 - validation error
   * 409 - already in favorites
   */
  export type ResponseError = APIError<400 | 409>;
}
