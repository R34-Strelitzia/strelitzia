import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

import type { APIError } from '../error';
import { Preset, PresetWithID } from './preset';

/**
 * POST /presets/
 *
 * Required Bearer Auth
 *
 * Success: 201 - Preset Entity in Response Body
 *
 * Error: 400 - Bad Request, 403 - Forbidden, 409 - Conflict
 */
export namespace CreatePreset {
  export const path = '/presets/';

  /**
   * Required Bearer Auth
   */
  export class Request {
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => Preset)
    preset: Preset;
  }

  /**
   * statusCode: 201 - Created
   */
  export class Response {
    preset: Required<PresetWithID>;
  }

  /**
   * statusCode:
   *
   * 400 - Validation Error
   *
   * 403 - Forbidden, need auth
   *
   * 409 - Conflict
   */
  export type ResponseError = APIError<400 | 403 | 409>;
}
