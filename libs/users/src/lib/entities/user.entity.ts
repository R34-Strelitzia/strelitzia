import { IsEmail, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IUser } from '@strelitzia/contracts/v2';

export class UserEntity implements IUser {
  @ApiProperty()
  @Length(4, 20)
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
