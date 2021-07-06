import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export * from "./user.validations";
export * from "./web.validations";

export function validate() {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const outputErrors: Record<string, any> = {};
      errors.array().forEach((val) => {
        outputErrors[val.param] = val.msg;
      });
      res.status(StatusCodes.BAD_REQUEST).json({
        ie: outputErrors,
        message: "Invalid incomplete/input",
      });
      return;
    }
    return next();
  };
}

export default validate;
