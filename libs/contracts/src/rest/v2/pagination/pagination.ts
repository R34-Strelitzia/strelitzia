import { IsInt, Max, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(100)
  size: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  page: number;
}
