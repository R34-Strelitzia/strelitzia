import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

import type { Preset } from './preset';
import type { APIError } from '../error';
import { Pagination } from '../pagination/pagination';

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
    presets: Preset[];
  }

  /**
   * statusCode:
   * 403 - forbidden, need auth
   * 404 - not found created preset by this user
   */
  export type ResponseError = APIError<403 | 404>;
}
