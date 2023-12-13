import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class NotAcceptableException extends HttpException {
  public constructor(message: string, data?: unknown) {
    super(StatusCodes.NOT_ACCEPTABLE, message || "Not Acceptable", data);
  }
}

export default NotAcceptableException;
