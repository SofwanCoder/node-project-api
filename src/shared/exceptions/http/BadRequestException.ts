import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class BadRequestException extends HttpException {
  public constructor(message: string, data?: any) {
    super(StatusCodes.BAD_REQUEST, message || "Bad Request", data);
  }
}

export default BadRequestException;
