import { NextFunction, Request, Response } from "express";
import UserController from "../controllers/UserController";
import { respond } from "../utils/response";
import { CreateUserPayload, LoginUserPayload } from "../@types/user";

class UserHandler {
  public static async handleCreateUser(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await UserController.createUserController(
        req.body as CreateUserPayload
      );
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }

  public static async handleLoginUser(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await UserController.loginUserController(
        req.body as LoginUserPayload
      );
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }
}

export default UserHandler;
