import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class ServiceUnavailableException extends HttpException {
  public constructor(message: string, data?: unknown) {
    super(
      StatusCodes.SERVICE_UNAVAILABLE,
      message || "Service Unavailable",
      data,
    );
  }
}

export default ServiceUnavailableException;
