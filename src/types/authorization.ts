import { type TokenType } from "../enums/token";

export interface AuthorizedUser {
  id: string;
  clearance: number;
  type: TokenType;
  session_id: string;
  user_id: string;
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

export interface DoEmailVerificationPayload {
  id: string;
  code: string;
}
