import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class UnauthorizedException extends HttpException {
  public constructor(message: string, data?: any) {
    super(StatusCodes.UNAUTHORIZED, message || "You're not authorized", data);
  }
}

export default UnauthorizedException;
