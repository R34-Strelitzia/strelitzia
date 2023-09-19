import { ApiProperty } from '@nestjs/swagger';
import { User } from '@strelitzia/contracts/v2';
import { IsEmail, Length } from 'class-validator';

export class UserDto implements User {
  @ApiProperty()
  @Length(4, 20)
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
