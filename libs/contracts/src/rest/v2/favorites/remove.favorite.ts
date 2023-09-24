import { ApiSchema } from '../decorators';
import type { APIError } from '../error';

/**
 * DELETE /favorites/:id
 *
 * Required Bearer Auth
 *
 * Success: 204 - Empty Response Body
 *
 * Error: 400 - Validation Error, 401 - Unauthorized, 404 - Not Found
 */
export namespace RemoveFavorite {
  /**
   * Required preset **id** param, like **"/favorites/:id"**
   */
  export const path = '/favorites/';

  /**
   * Required Bearer Auth
   */
  @ApiSchema({ name: 'RemoveFavoriteRequest' })
  export class Request {}

  /**
   * statusCode: 204 - No Content
   */
  export class Response {}

  /**
   * statusCode:
   *
   * 400 - validation error
   *
   * 401 - unauthorized
   *
   * 404 - post not in favorites
   */
  export type ResponseError = APIError<400 | 401 | 404>;
}
