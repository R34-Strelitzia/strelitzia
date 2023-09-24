import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Favorite } from './favorite';
import type { APIError } from '../error';
import { Pagination } from '../pagination';
import { ApiSchema } from '../decorators';
/**
 * GET /favorites/
 *
 * Required Bearer Auth
 *
 * Success: 200 - Favorite Entity List in Response Body
 *
 * Error: 400 - Bad Request, 401 - Unauthorized, 404 - Not Found
 */
export namespace FindAllFavorite {
  export const path = '/favorites/';

  /**
   * Required Bearer Auth
   */
  @ApiSchema({ name: 'FindAllFavoritesRequest' })
  export class Request {
    @ApiProperty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => Pagination)
    pagination: Pagination;
  }

  /**
   * statusCode: 200 - OK
   */
  @ApiSchema({ name: 'FindAllFavoritesResponse' })
  export class Response {
    @ApiProperty({ type: [Favorite] })
    favorites: Favorite[];
  }

  /**
   * statusCode:
   * 400 - validation error
   *
   * 401 - unauthorized
   *
   * 404 - post not in favorites
   */
  export type ResponseError = APIError<400 | 401 | 404>;
}
