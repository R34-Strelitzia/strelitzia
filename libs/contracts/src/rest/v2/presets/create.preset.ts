import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import type { APIError } from '../error';
import { ApiSchema } from '../decorators';
import { TagPresetWithoutId, TagPresetEntity } from './preset';

/**
 * POST /presets/
 *
 * Required Bearer Auth
 *
 * Success: 201 - Preset Entity in Response Body
 *
 * Error: 400 - Bad Request, 401 - Unauthorized, 409 - Conflict
 */
export namespace CreatePreset {
  export const path = '/presets/';

  /**
   * Required Bearer Auth
   */
  @ApiSchema({ name: 'CreatePresetRequest' })
  export class Request {
    @ApiProperty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => TagPresetWithoutId)
    preset: TagPresetWithoutId;
  }

  /**
   * statusCode: 201 - Created
   */
  @ApiSchema({ name: 'CreatePresetResponse' })
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
   * 409 - Conflict
   */
  export type ResponseError = APIError<400 | 401 | 409>;
}
