import { IsNumber, Max, Min } from 'class-validator';

export class Pagination {
  @IsNumber()
  @Min(1)
  @Max(100)
  size: number;

  @IsNumber()
  @Min(0)
  page: number;
}
