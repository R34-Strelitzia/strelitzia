import type { APIError } from '../error';
import type { PresetWithID } from './preset';

/**
 * GET /presets/:id
 *
 * Required Bearer Auth
 *
 * Success: 200 - Preset Entity in Response Body
 *
 * Error: 403 - Forbidden, 404 - Not Found
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
