import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/token.helper";
import config from "../config";
import { AuthorizedUser } from "../types/authorization";
import logger from "../internal/logger";

export function decryptAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(" ")[1];

  if (!token) {
    return next();
  }
  let payload: AuthorizedUser;
  try {
    payload = verifyToken(config.jwt.key || "", token);
    payload.token = token;
    res.locals.authorizedUser = payload;
  } catch (e) {
    logger.error(e);
  }
  return next();
}
