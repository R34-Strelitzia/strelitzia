export interface IJwtPayload {
  iss: string;
  sub?: string;
  iat: number;
  exp: number;
  type: TokenType;
}

export type IJwtRefreshPayload = IJwtPayload

export type TokenType = 'access' | 'refresh';
