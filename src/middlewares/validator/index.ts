import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { respond, vague } from "../../utils/response";
import Joi from "joi";

export function validateWithJoi<T>(schema: Joi.Schema<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
    } catch (e: unknown) {
      console.log(e);
      const error = e as Joi.ValidationError;
      const errors: Record<string, string> = {};
      error.details.forEach((err) => {
        errors[err.context?.key as string] = err.message;
      });
      respond(
        res,
        vague(errors, StatusCodes.EXPECTATION_FAILED, "Input validation error"),
      );
      return;
    }
    next();
  };
}

export default validateWithJoi;
