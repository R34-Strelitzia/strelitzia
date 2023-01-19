import type { APIError } from '../error';
import type { Preset } from './preset';

/**
 * PUT /presets/:id
 *
 * Required Bearer Auth
 *
 * Success: 200 - Preset Entity in Response Body
 *
 * Error: 403 - Forbidden, 404 - Not Found
 */
export namespace UpdatePreset {
  /**
   * Required preset **id** param, like **"/presets/:id"**
   */
  export const path = '/presets/';

  /**
   * Required Bearer Auth
   */
  export class Request {
    preset: Preset;
  }

  /**
   * statusCode: 200 - OK
   */
  export class Response {
    preset: Preset;
  }

  /**
   * statusCode:
   * 403 - forbidden, need auth
   * 404 - preset not found
   */
  export type ResponseError = APIError<403 | 404>;
}
