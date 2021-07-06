import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../lib/logger";
import HttpException from "../exceptions/http/HttpException";

/**
 * @method  errorMiddleware
 * @description errorhandler middleware to return  custom errors and catch errors
 * @param error
 * @param request
 * @param response
 * @param next
 */
function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  logger.error("Unexpected error: ", error);
  const code = error.code ? error.code : StatusCodes.INTERNAL_SERVER_ERROR;
  const message =
    error.message || "Request could not be completed due to an error";
  response.status(code).json({
    code,
    message,
  });
}

export default errorMiddleware;
