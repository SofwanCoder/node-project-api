import config from "../config";
import { User } from "../models/User";
import Session from "../models/Session";
import { generateToken } from "./token.helper";

export async function generateAuthorization(
  user: User
): Promise<[string, string]> {
  const token = generateToken(
    config.jwt.key,
    {
      id: user.id,
      clearance: user.clearance,
      type: "auth",
    },
    {
      expiresIn: "1 days",
    }
  );

  const refresh = generateToken(
    config.jwt.key,
    {
      id: user.id,
      type: "refresh",
    },
    {
      expiresIn: "60 days",
    }
  );

  await Session.create({
    auth_token: token,
    user_id: user.id,
    refresh_token: refresh,
  });

  return [token, refresh];
}
