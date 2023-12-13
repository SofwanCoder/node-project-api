import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class ConflictException extends HttpException {
  public constructor(message: string, data?: unknown) {
    super(StatusCodes.CONFLICT, message || "Conflict", data);
  }
}

export default ConflictException;
