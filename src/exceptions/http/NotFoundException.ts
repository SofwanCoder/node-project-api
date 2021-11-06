import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
  public constructor(message: string, data?: any) {
    super(StatusCodes.NOT_FOUND, message || "Not found", data);
  }
}

export default NotFoundException;
