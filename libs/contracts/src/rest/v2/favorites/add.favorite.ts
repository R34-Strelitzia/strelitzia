import { ApiProperty } from '@nestjs/swagger';

import { Favorite } from './favorite';
import type { APIError } from '../error';

/**
 * POST /favorites/:id
 *
 * Required Bearer Auth
 *
 * Success: 201 - Favorite Entity in Response Body
 *
 * Error: 400 - Bad Request, 403 - Forbidden, 409 - Conflict
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
   * statusCode: 201 - Created
   */
  export class Response {
    @ApiProperty({ type: Favorite })
    favorite: Favorite;
  }

  /**
   * statusCode:
   * 400 - validation error
   * 409 - already in favorites
   */
  export type ResponseError = APIError<400 | 409>;
}
