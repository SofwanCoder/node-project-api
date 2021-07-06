import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function sendResponse(res: Response, responseData: any) {
  if (res.writableFinished || res.writableEnded) return;
  res.status(responseData.code).json({ ...responseData, code: undefined });
}

export function generateSuccessMessage(message: string) {
  return {
    code: StatusCodes.OK,
    message,
  };
}

export function generateErrorMessage(
  message: string,
  code: number = StatusCodes.BAD_REQUEST
) {
  return {
    code,
    message,
  };
}

export function generateMessage(
  message = "Successful",
  code: number = StatusCodes.OK,
  data: any = null
) {
  const resp = {
    code,
    message,
    data: undefined,
  };
  if (data) resp.data = data;
  return resp;
}

export function respond(
  res: Response,
  message: string,
  code: number,
  data: any = null
) {
  return sendResponse(res, generateMessage(message, code, data));
}
