import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class UserEntity {
  @ApiProperty()
  @Length(4, 20)
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
