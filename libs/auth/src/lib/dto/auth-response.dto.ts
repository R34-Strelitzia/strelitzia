import { ApiProperty } from '@nestjs/swagger';
import { IAuthResponse } from '@strelitzia/contracts/v2';
import { UserEntity } from '@strelitzia/users';

export class AuthResponseDTO implements IAuthResponse {
  @ApiProperty({ type: UserEntity })
  user: UserEntity;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
