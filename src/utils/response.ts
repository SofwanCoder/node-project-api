import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function sendData(
  res: Response,
  code: number,
  data: Record<string, unknown>
) {
  if (res.writableFinished || res.writableEnded) return;
  res.status(code).json(data);
}

export function respond(
  res: Response,
  {
    message,
    code,
    data,
    errors,
    ok,
  }: {
    message?: string;
    code?: number;
    data?: any;
    errors?: Record<string, string>;
    ok?: boolean;
  } = {}
) {
  const resData = {
    data: data || undefined,
    errors: errors || undefined,
    message: message || "completed",
    ok: ok || false,
  };
  return sendData(res, code || StatusCodes.OK, resData);
}

export function success<D>(data: D, message = "completed") {
  return {
    ok: true,
    data,
    message,
  };
}
