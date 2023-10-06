import { ApiResponseProperty } from '@nestjs/swagger';

import { Favorite } from './favorite';
import type { APIError } from '../error';
import { ApiSchema } from '../decorators';
import { PaginatedResponse, Pagination } from '../pagination';
/**
 * GET /favorites/
 *
 * Required Bearer Auth
 *
 * Success: 200 - Favorite Entity List in Response Body
 *
 * Error: 400 - Bad Request, 401 - Unauthorized
 */
export namespace FindAllFavorite {
  export const path = '/favorites/';

  /**
   * Required Bearer Auth
   *
   * ### This is Query Params
   */
  @ApiSchema({ name: 'FindAllFavoritesRequest' })
  export class Request extends Pagination {}

  /**
   * statusCode: 200 - OK
   */
  @ApiSchema({ name: 'FindAllFavoritesResponse' })
  export class Response implements PaginatedResponse<Favorite> {
    @ApiResponseProperty()
    total: number;

    @ApiResponseProperty()
    page: number;

    @ApiResponseProperty()
    size: number;

    @ApiResponseProperty({ type: [Favorite] })
    content: Favorite[];
  }

  /**
   * statusCode:
   * 400 - validation error
   *
   * 401 - unauthorized
   */
  export type ResponseError = APIError<400 | 401>;
}
