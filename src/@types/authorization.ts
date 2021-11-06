export enum TokenType {
  AUTH = "auth",
  REFRESH = "refresh",
}

export interface AuthorizedUser {
  id: string | number;
  token: string;
  clearance: number;
  type: TokenType.AUTH;
}

export interface RefreshedUser {
  id: string | number;
  token: string;
  type: TokenType.REFRESH;
}
