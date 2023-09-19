import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from './user.dto';
import { RefreshJwt } from '@strelitzia/contracts/v2';

export class RefreshJwtResponse implements RefreshJwt.Response {
  @ApiProperty()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
