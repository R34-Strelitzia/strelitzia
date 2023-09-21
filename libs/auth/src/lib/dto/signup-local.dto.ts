import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  ValidateNested,
  IsStrongPassword,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { SignUpLocal } from '@strelitzia/contracts/v2';
import { UserEntity } from '@strelitzia/users';

export class SignUpLocalDTO implements SignUpLocal.Request {
  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserEntity)
  user: UserEntity;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
