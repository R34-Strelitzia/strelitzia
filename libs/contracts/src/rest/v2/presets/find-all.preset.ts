import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

import type { APIError } from '../error';
import type { PresetWithID } from './preset';
import { Pagination } from '../pagination';

/**
 * GET /presets/
 *
 * Required Bearer Auth
 *
 * Success: 200 - Preset Entity List in Response Body
 *
 * Error: 403 - Forbidden, 404 - Not Found
 */
export namespace FindAllPresets {
  export const path = '/presets/';

  /**
   * Required Bearer Auth
   */
  export class Request {
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => Pagination)
    pagination: Pagination;
  }

  /**
   * statusCode: 200 - OK
   */
  export class Response {
    presets: Required<PresetWithID>[];
  }

  /**
   * statusCode:
   * 403 - Forbidden, need auth
   * 404 - Presets Not Found
   */
  export type ResponseError = APIError<403 | 404>;
}
