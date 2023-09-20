import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { LoginLocal } from '@strelitzia/contracts/v2';

export class LoginLocalDTO implements LoginLocal.Request {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
