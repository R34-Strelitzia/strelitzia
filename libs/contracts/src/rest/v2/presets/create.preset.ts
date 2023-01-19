import type { APIError } from '../error';
import type { Preset } from './preset';

/**
 * POST /presets/
 *
 * Required Bearer Auth
 *
 * Success: 200 - Preset Entity in Response Body
 *
 * Error: 400 - Bad Request, 403 - Forbidden, 409 - Conflict
 */
export namespace CreatePreset {
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
   *
   * 400 - validation error
   *
   * 403 - forbidden, need auth
   *
   * 409 - Conflict
   */
  export type ResponseError = APIError<400 | 403 | 409>;
}
