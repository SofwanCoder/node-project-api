import { type NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../internal/logger";
import type HttpException from "../exceptions/http/HttpException";
import { respond, vague } from "../utils/response";

/**
 * @method  errorMiddleware
 * @description errorhandler middleware to return  custom errors and catch errors
 * @param error
 * @param request
 * @param res
 * @param next
 */
function errorMiddleware(
  error: HttpException,
  request: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    next(error);
    return;
  }
  const code = error.code ? error.code : StatusCodes.INTERNAL_SERVER_ERROR;
  const message =
    error.message || "Request could not be completed due to an error";
  logger.error(error);
  respond(res, vague({}, code, message));
}

export default errorMiddleware;
