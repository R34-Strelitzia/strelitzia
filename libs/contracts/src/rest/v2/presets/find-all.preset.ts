import { ApiResponseProperty } from '@nestjs/swagger';

import type { APIError } from '../error';
import { ApiSchema } from '../decorators';
import { TagPresetEntity } from './preset';
import { PaginatedResponse, Pagination } from '../pagination';

/**
 * GET /presets/
 *
 * Required Bearer Auth
 *
 * Success: 200 - Preset Entity List in Response Body
 *
 * Error: 400 - Validation Error, 401 - Unauthorized
 */
export namespace FindAllPresets {
  export const path = '/presets/';

  /**
   * Required Bearer Auth
   *
   * ### This is Query Params
   */
  @ApiSchema({ name: 'FindAllPresetsRequest' })
  export class Request extends Pagination {}

  /**
   * statusCode: 200 - OK
   */
  @ApiSchema({ name: 'FindAllPresetsResponse' })
  export class Response implements PaginatedResponse<TagPresetEntity> {
    @ApiResponseProperty()
    total: number;

    @ApiResponseProperty()
    page: number;

    @ApiResponseProperty()
    size: number;

    @ApiResponseProperty({ type: [TagPresetEntity] })
    content: TagPresetEntity[];
  }

  /**
   * statusCode:
   *
   * 400 - Validation Error
   *
   * 401 - Unauthorized, need auth
   */
  export type ResponseError = APIError<400 | 401>;
}
