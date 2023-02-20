export interface IJwtPayload {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface IJwtRefreshPayload extends IJwtPayload {
  isRefresh: true;
}
