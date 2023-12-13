import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class GoneException extends HttpException {
  public constructor(message: string, data?: unknown) {
    super(StatusCodes.GONE, message || "Bad Request", data);
  }
}

export default GoneException;
