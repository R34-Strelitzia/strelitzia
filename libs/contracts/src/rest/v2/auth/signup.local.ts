import {
  IsNotEmptyObject,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '../users';
import type { APIError } from '../error';
import type { IAuthResponse } from './interfaces';

/**
 * POST /auth/signup/
 *
 * Success: 201 - User Entity, access and refresh tokens in Response Body
 *
 * Error: 400 - Bad Request, 409 - Conflict
 */
export namespace SignUpLocal {
  export const path = '/auth/signup/';

  export class Request {
    @ApiProperty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => UserEntity)
    user: UserEntity;

    /**
     * The password must be strong!
     *
     * Min Length 8, Min Uppercase 1, Min Symbols 1, Min Numbers 1
     */
    @ApiProperty()
    @IsStrongPassword()
    password: string;
  }

  /**
   * statusCode: 201 - Created
   */
  export class Response implements IAuthResponse {
    @ApiProperty({ type: UserEntity })
    user: UserEntity;

    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;
  }

  /**
   * statusCode:
   * 400 - validation error
   * 409 - email or username already taken
   */
  export type ResponseError = APIError<400 | 409>;
}
