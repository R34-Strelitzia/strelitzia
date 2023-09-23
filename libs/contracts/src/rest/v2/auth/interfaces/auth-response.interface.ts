import { UserEntity } from '../../users';

export interface IAuthResponse {
  user: UserEntity;
  accessToken: string;
  refreshToken: string;
}
