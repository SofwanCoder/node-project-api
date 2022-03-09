import { NextFunction, Request, Response } from "express";
import { respond } from "../utils/response";
import {
  CreateTokenPayload,
  RefreshTokenPayload,
} from "../types/authorization";
import AuthController from "../controllers/AuthController";

export default class AuthHandler {
  public static async handleCreateToken(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await AuthController.createTokenController(
        req.body as CreateTokenPayload
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
    next: NextFunction
  ) {
    try {
      const response = await AuthController.refreshTokenController(
        req.body as RefreshTokenPayload
      );
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }
}
