import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponse<T> {
  @ApiProperty({ readOnly: true })
  total: number;

  @ApiProperty({ readOnly: true })
  page: number;

  @ApiProperty({ readOnly: true })
  size: number;

  @ApiProperty({ readOnly: true, isArray: true })
  content: T[];
}
