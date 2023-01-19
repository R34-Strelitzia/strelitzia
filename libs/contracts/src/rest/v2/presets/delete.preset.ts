import type { APIError } from '../error';

/**
 * DELETE /presets/:id
 *
 * Required Bearer Auth
 *
 * Success: 204 - Empty Response Body
 *
 * Error: 403 - Forbidden, 404 - Not Found
 */
export namespace DeletePreset {
  /**
   * Required preset **id** param, like **"/presets/:id"**
   */
  export const path = '/presets/';

  /**
   * Required Bearer Auth
   *
   */
  export class Request {}

  /**
   * statusCode: 204 - No Content
   */
  export class Response {}

  /**
   * statusCode:
   * 403 - forbidden, need auth
   * 404 - preset not found
   */
  export type ResponseError = APIError<403 | 404>;
}
