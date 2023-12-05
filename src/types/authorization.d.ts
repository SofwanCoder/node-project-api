import { TokenType } from "../enums/token";

export interface AuthorizedUser {
  id: string | number;
  token: string;
  clearance: number;
  type: TokenType.AUTH;
  session_id: number;
}

export interface RefreshedUser {
  id: string | number;
  token: string;
  type: TokenType.REFRESH;
}

export interface CreateTokenPayload {
  email: string;
  password: string;
}

export interface RefreshTokenPayload {
  refresh_token: string;
}
