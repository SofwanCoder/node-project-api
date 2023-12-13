import { type NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { respond } from "../utils/response";

export function fileUploadValidator(key = "file") {
  return (req: Request, res: Response, next: NextFunction) => {
    let er;
    const message = "Invalid incomplete/upload";

    if (!req.file) {
      er = "Upload missing";
    }

    if (er) {
      respond(res, {
        message,
        data: {
          [key]: er,
        },
        code: StatusCodes.EXPECTATION_FAILED,
      });
      return;
    }

    next();
  };
}
