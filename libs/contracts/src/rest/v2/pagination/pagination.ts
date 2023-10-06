import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class Pagination {
  @ApiProperty({ default: 10 })
  @Transform((params) => Number(params.value))
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  size: number = 10;

  @ApiProperty({ default: 1 })
  @Transform((params) => Number(params.value))
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;
}
