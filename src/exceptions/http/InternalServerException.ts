import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class InternalServerException extends HttpException {
  public constructor(message: string, data?: any) {
    super(
      StatusCodes.INTERNAL_SERVER_ERROR,
      message || "Internal Server Error",
      data
    );
  }
}

export default InternalServerException;
