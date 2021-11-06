import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export default class TeapotException extends HttpException {
  public constructor(message: string, data?: any) {
    super(StatusCodes.IM_A_TEAPOT, message || "Unable to brew coffee", data);
  }
}
