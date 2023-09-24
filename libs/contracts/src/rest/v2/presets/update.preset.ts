import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

import { TagPresetEntity, TagPresetWithoutId } from './preset';
import type { APIError } from '../error';
import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '../decorators';

/**
 * PATCH /presets/
 *
 * Required Bearer Auth
 *
 * Success: 200 - Preset Entity in Response Body
 *
 * Error: 400 - Validation Error, 401 - Unauthorized, 404 - Not Found
 */
export namespace UpdatePreset {
  /**
   * Required preset **id** param, like **"/presets/:id"**
   */
  export const path = '/presets/';

  /**
   * Required Bearer Auth
   */
  @ApiSchema({ name: 'UpdatePresetRequest' })
  export class Request {
    @ApiProperty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => TagPresetWithoutId)
    preset: TagPresetWithoutId;
  }

  /**
   * statusCode: 200 - OK
   */
  @ApiSchema({ name: 'UpdatePresetResponse' })
  export class Response {
    @ApiProperty({ type: TagPresetEntity })
    preset: TagPresetEntity;
  }

  /**
   * statusCode:
   *
   * 400 - Validation Error
   *
   * 401 - Unauthorized, need auth
   *
   * 404 - Preset Not Found
   */
  export type ResponseError = APIError<400 | 401 | 404>;
}
