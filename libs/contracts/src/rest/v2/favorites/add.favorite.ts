import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Favorite } from './favorite';
import type { APIError } from '../error';
import { ApiSchema } from '../decorators';

/**
 * POST /favorites/:id
 *
 * Required Bearer Auth
 *
 * Success: 201 - Favorite Entity in Response Body
 *
 * Error: 400 - Bad Request, 401 - Unauthorized, 409 - Conflict
 */
export namespace AddFavorite {
  export const path = '/favorites/';

  /**
   * Required Bearer Auth
   */
  export class Request {
    @ApiProperty({ type: Favorite })
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => Favorite)
    favorite: Favorite;
  }

  /**
   * statusCode: 201 - Created
   */
  @ApiSchema({ name: 'AddFavoriteResponse' })
  export class Response {
    @ApiProperty({ type: Favorite })
    favorite: Favorite;
  }

  /**
   * statusCode:
   * 400 - validation error
   *
   * 401 - unauthorized
   *
   * 409 - already in favorites
   */
  export type ResponseError = APIError<400 | 401 | 409>;
}
