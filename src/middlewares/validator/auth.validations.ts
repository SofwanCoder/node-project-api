import { body } from "express-validator";
import { NextFunction, Request, Response } from "express";
import BadRequestException from "../../exceptions/http/BadRequestException";
import { RefreshedUser, TokenType } from "../../@types/authorization";
import { verifyToken } from "../../helpers/token.helper";
import config from "../../config";

export function validateRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const refreshToken = req.headers["x-auth-refresh"] as string;
  if (!refreshToken) {
    throw new BadRequestException("Invalid Request");
  }
  let payload: RefreshedUser;
  try {
    payload = verifyToken(config.jwt.key, refreshToken);
    payload.token = refreshToken;
    res.locals.refreshedUser = payload;
  } catch (e) {
    throw new BadRequestException("Invalid Request! Please login again");
  }
  if (payload.type !== TokenType.REFRESH) {
    throw new BadRequestException("Cross-request token error");
  }
  next();
}

export function resetPasswordRules() {
  return [body("email").isString().trim().isEmail()];
}

export function loginUserRules() {
  return [body("email").isString().isEmail(), body("password").isString()];
}

export function completePasswordResetRules() {
  return [
    body("token").isString(),
    body(["password", "password_confirm"])
      .isString()
      .isLength({ min: 6 })
      .withMessage("Minimum of length 6 required"),
    body("password_confirm").custom((value, meta) => {
      if (value !== meta.req.body.password) {
        throw new Error("Password does not match");
      }

      return true;
    }),
  ];
}

export function validatePasswordResetRules() {
  return [
    body("ref").isString(),
    body("code").not().isArray().isLength({ min: 6, max: 6 }),
  ];
}
