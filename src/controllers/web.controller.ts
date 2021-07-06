import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../shared/utils/responseManager";

import WebService from "../service/web.service";

class WebController {
  public static async handleSubscribe(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await WebService.subscribeEmail(req.body.email);
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
      const response = await WebService.contactUs(req.body);
      return sendResponse(res, response);
    } catch (error) {
      next(error);
    }
  }
}

export default WebController;
