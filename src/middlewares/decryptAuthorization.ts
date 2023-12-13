import { type NextFunction, type Request, type Response } from "express";
import { verifyToken } from "../helpers/token.helper";
import config from "../config";
import logger from "../internal/logger";

export function decryptAuthorization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(" ")[1];

  if (!token) {
    next();
    return;
  }

  try {
    res.locals.authorizedUser = verifyToken(config.jwt.key || "", token);
  } catch (e) {
    logger.error(e);
  }
  next();
}
