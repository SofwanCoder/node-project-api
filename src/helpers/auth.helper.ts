import config from "../config";
import { User } from "../models/User";
import Session from "../models/Session";
import { generateToken } from "./token.helper";

export async function generateAuthorization(
  user: User,
  session?: Session
): Promise<[string, string]> {
  let refresh: string;

  if (session) {
    refresh = session.refresh_token;
  } else {
    refresh = generateToken(
      config.jwt.key,
      {
        id: user.id,
        type: "refresh",
      },
      {
        expiresIn: "60 days",
      }
    );

    session = await Session.create({
      user_id: user.id,
      refresh_token: refresh,
    });
  }

  const token = generateToken(
    config.jwt.key,
    {
      id: user.id,
      type: "auth",
      session_id: session.id,
    },
    {
      expiresIn: "1 days",
    }
  );

  return [token, refresh];
}
