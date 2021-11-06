import { NextFunction, Request, Response } from "express";
import UserController from "../controllers/UserController";
import { respond } from "../utils/response";

class UserHandler {
  public static async handleSubscribe(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await UserController.createUserController(req.body);
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }

  public static async handleContact(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await UserController.loginUserController(req.body);
      respond(res, response);
    } catch (error) {
      next(error);
    }
  }
}

export default UserHandler;
