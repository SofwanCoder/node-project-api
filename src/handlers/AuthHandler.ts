import { NextFunction, Request, Response } from "express";
import { respond } from "../utils/response";
import AuthController from "../controllers/AuthController";
import {
  CreateTokenPayload,
  RefreshTokenPayload,
} from "../types/authorization";

export default class AuthHandler {
  public static async handleCreateSession(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await AuthController.createTokenController(
        req.body as CreateTokenPayload,
      );
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }

  public static async handleRefreshToken(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await AuthController.refreshTokenController(
        req.body as RefreshTokenPayload,
      );
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }

  public static async handleSendVerificationEmail(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await AuthController.sendVerificationEmailController(
        res.locals.authorizedUser.user_id,
      );
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }

  public static async handleDoEmailVerification(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await AuthController.doEmailVerificationController(
        res.locals.authorizedUser.user_id,
        req.body,
      );
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }
}
