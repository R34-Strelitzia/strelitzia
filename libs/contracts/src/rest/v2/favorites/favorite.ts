import { IsNumber } from 'class-validator';

export class Favorite {
  @IsNumber()
  postId: number;
}
