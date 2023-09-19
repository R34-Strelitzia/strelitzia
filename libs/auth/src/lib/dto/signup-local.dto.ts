import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  ValidateNested,
  IsStrongPassword,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { SignUpLocal } from '@strelitzia/contracts/v2';
import { UserDto } from './user.dto';


export class SignUpLocalDTO implements SignUpLocal.Request {
  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}

export class SignUpLocalResponse implements SignUpLocal.Response {
  @ApiProperty()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
