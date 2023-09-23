import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class Favorite {
  @ApiProperty()
  @IsInt()
  postId: number;
}
