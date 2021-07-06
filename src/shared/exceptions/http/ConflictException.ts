import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class ConflictException extends HttpException {
  public constructor(message: string, data?: any) {
    super(StatusCodes.CONFLICT, message || "Conflict", data);
  }
}

export default ConflictException;
