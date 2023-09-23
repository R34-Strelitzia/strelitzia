import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Favorite } from './favorite';
import type { APIError } from '../error';
import { Pagination } from '../pagination';
/**
 * GET /favorites/
 *
 * Required Bearer Auth
 *
 * Success: 200 - Favorite Entity List in Response Body
 *
 * Error: 400 - Bad Request, 403 - Forbidden, 404 - Not Found
 */
export namespace FindAllFavorite {
  export const path = '/favorites/';

  /**
   * Required Bearer Auth
   */
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
  export class Response {
    @ApiProperty({ type: [Favorite] })
    favorites: Favorite[];
  }

  /**
   * statusCode:
   * 400 - validation error
   * 404 - post not in favorites
   */
  export type ResponseError = APIError<400 | 404>;
}
