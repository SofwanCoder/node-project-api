import config from "../config";
import { type User } from "../models/User";
import Session from "../models/Session";
import { generateToken } from "./token.helper";
import { DateTime } from "luxon";
import { AuthorizedUser } from "../types/authorization";
import { TokenType } from "../enums/token";

export async function generateAuthorization(
  user: User,
  session?: Session,
): Promise<{ access_token: string; refresh_token: string }> {
  const auth_session = session
    ? await regenerateSession(session)
    : await generateSession(user);

  const access_token = generateToken(
    config.jwt.key,
    (<AuthorizedUser>{
      id: auth_session.id,
      user_id: auth_session.user_id,
      type: TokenType.REFRESH,
      session_id: auth_session.id,
      clearance: 1,
    }) as unknown as Record<string, unknown>,
    {
      expiresIn: "1 days",
    },
  );

  return { access_token, refresh_token: generateRefreshToken(auth_session) };
}

export async function generateSession(user: User) {
  return await Session.create({
    user_id: user.id,
  });
}

/**
 * For now, we just increment the used_count column
 * @param session
 */
export async function regenerateSession(session: Session): Promise<Session> {
  return await session.increment("used_count");
}

export function generateRefreshToken(session: Session): string {
  const expiresIn = DateTime.fromJSDate(session.expires_at)
    .diffNow("seconds")
    .as("seconds");

  return generateToken(
    config.jwt.key,
    (<AuthorizedUser>{
      id: session.id,
      user_id: session.user_id,
      type: TokenType.REFRESH,
      session_id: session.id,
      clearance: 1,
    }) as unknown as Record<string, unknown>,
    {
      expiresIn: `${expiresIn}s`,
    },
  );
}
