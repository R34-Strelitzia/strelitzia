import { IUser } from "../users";

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
