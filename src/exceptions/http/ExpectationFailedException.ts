import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class ExpectationFailedException extends HttpException {
  public constructor(message: string, data?: unknown) {
    super(
      StatusCodes.EXPECTATION_FAILED,
      message || "Expectation Failed",
      data,
    );
  }
}

export default ExpectationFailedException;
