import { IsString } from 'class-validator';

export class Favorite {
  @IsString()
  postId: number;
}
