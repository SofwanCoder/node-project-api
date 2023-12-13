import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class MethodNotAllowedException extends HttpException {
  public constructor(message: string, data?: unknown) {
    super(StatusCodes.METHOD_NOT_ALLOWED, message || "Bad Request", data);
  }
}

export default MethodNotAllowedException;
