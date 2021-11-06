import { Base64 } from "js-base64";
import { SignOptions, sign, verify } from "jsonwebtoken";

export function generateToken(
  key: string,
  payload: Record<string, string | number>,
  options: SignOptions = {}
) {
  const encryptionKey = Base64.decode(key);

  try {
    return sign(payload, encryptionKey, options);
  } catch (e) {
    return "";
  }
}

export function verifyToken<T>(key: string, token: string) {
  const encryptionKey = Base64.decode(key);
  try {
    return verify(token, encryptionKey) as T;
  } catch (e) {
    throw new Error("Unable to verify token");
  }
}
