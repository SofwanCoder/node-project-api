import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class UnprocessableEntity extends HttpException {
  public constructor(message: string, data?: any) {
    super(StatusCodes.UNPROCESSABLE_ENTITY, message || "Bad Request", data);
  }
}

export default UnprocessableEntity;
