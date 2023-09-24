import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

import type { APIError } from '../error';
import { TagPresetEntity } from './preset';
import { Pagination } from '../pagination';
import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../decorators';

/**
 * GET /presets/
 *
 * Required Bearer Auth
 *
 * Success: 200 - Preset Entity List in Response Body
 *
 * Error: 400 - Validation Error, 401 - Unauthorized, 404 - Not Found
 */
export namespace FindAllPresets {
  export const path = '/presets/';

  /**
   * Required Bearer Auth
   */
  @ApiSchema({ name: 'FindAllPresetsRequest' })
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
  @ApiSchema({ name: 'FindAllPresetsResponse' })
  export class Response {
    @ApiProperty({ type: [TagPresetEntity] })
    presets: TagPresetEntity[];
  }

  /**
   * statusCode:
   *
   * 400 - Validation Error
   *
   * 401 - Unauthorized, need auth
   *
   * 404 - Presets Not Found
   */
  export type ResponseError = APIError<400 | 401 | 404>;
}
