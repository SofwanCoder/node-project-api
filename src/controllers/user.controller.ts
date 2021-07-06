import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../shared/utils/responseManager";

import UserService from "../service/user.service";

class UserController {

  public static async handleCreateUser(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await UserService.createNewUser(req.body);
      return sendResponse(res, response);
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
      const response = await UserService.loginUser(req.body);
      return sendResponse(res, response);
    } catch (error) {
      next(error);
    }
  }

}

export default UserController;
