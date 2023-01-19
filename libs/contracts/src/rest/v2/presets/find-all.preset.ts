import type { APIError } from '../error';
import type { Preset } from './preset';

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
  export class Request {}

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
