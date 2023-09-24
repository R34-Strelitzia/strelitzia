import { ApiProperty } from '@nestjs/swagger';
import type { APIError } from '../error';
import { TagPresetEntity } from './preset';
import { ApiSchema } from '../decorators';

/**
 * GET /presets/:id
 *
 * Required Bearer Auth
 *
 * Success: 200 - Preset Entity in Response Body
 *
 * Error: 400 - Validation Error, 401 - Unauthorized, 404 - Not Found
 */
export namespace FindOnePresets {
  /**
   * Required preset **id** param, like **"/presets/:id"**
   */
  export const path = '/presets/';

  /**
   * Required Bearer Auth
   */
  export class Request {}

  /**
   * statusCode: 200 - OK
   */
  @ApiSchema({ name: 'FindOnePresetsResponse' })
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
