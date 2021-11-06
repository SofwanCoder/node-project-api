import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { respond } from "../../utils/response";

export function validateRules() {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const outputErrors: Record<string, any> = {};
      errors.array().forEach((val) => {
        outputErrors[val.param] = val.msg;
      });
      const message = "Invalid incomplete/input";
      return respond(res, {
        message,
        errors: outputErrors,
        code: StatusCodes.EXPECTATION_FAILED,
      });
    }
    return next();
  };
}

export default validateRules;
