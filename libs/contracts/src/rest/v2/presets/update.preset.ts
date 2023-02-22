import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

import { PresetWithID } from './preset';
import type { APIError } from '../error';

/**
 * PUT /presets/
 *
 * Required Bearer Auth
 *
 * Success: 200 - Preset Entity in Response Body
 *
 * Error: 403 - Forbidden, 404 - Not Found
 */
export namespace UpdatePreset {
  export const path = '/presets/';

  /**
   * Required Bearer Auth
   */
  export class Request {
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PresetWithID)
    preset: PresetWithID;
  }

  /**
   * statusCode: 200 - OK
   */
  export class Response {
    preset: Required<PresetWithID>;
  }

  /**
   * statusCode:
   * 403 - Forbidden, need auth
   * 404 - Preset Not Found
   */
  export type ResponseError = APIError<403 | 404>;
}
