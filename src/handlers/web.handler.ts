import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../shared/utils/responseManager";

import UserController from "../controllers/user.controller";

class UserHandler {
  public static async handleSubscribe(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await UserController.createUserController(req.body);
      return sendResponse(res, response);
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
      return sendResponse(res, response);
    } catch (error) {
      next(error);
    }
  }
}

export default UserHandler;
