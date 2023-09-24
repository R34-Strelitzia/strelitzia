import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { UserEntity } from '../users';

export class AuthResponse {
  @ApiProperty({ type: UserEntity })
  user: UserEntity;

  @ApiResponseProperty()
  accessToken: string;

  @ApiResponseProperty()
  refreshToken: string;
}
