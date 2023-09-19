import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { LoginLocal } from '@strelitzia/contracts/v2';
import { UserDto } from './user.dto';

export class LoginLocalDTO implements LoginLocal.Request {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginLocalResponse implements LoginLocal.Response {
  @ApiProperty()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
