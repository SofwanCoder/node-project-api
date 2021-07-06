import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class ForbiddenException extends HttpException {
  public constructor(message: string, data?: any) {
    super(StatusCodes.FORBIDDEN, message || "Forbidden", data);
  }
}

export default ForbiddenException;
