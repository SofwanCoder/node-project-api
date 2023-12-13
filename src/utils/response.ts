import { type Response } from "express";
import { StatusCodes } from "http-status-codes";

interface VagueResponse {
  getStatus(): number;
  getMessage(): string;
}

export function sendData(res: Response, code: number, data: unknown) {
  if (res.writableFinished || res.writableEnded) return;
  res.status(code).json(data);
}

export function respond(res: Response, data: unknown) {
  const message = (<VagueResponse>data).getMessage();
  const code = (<VagueResponse>data).getStatus();
  res.setHeader("x-response-message", message || "completed");
  sendData(res, code || StatusCodes.OK, data);
}

export function success<D>(data: D, message = "completed"): D {
  (<VagueResponse>data).getStatus = () => StatusCodes.OK;
  (<VagueResponse>data).getMessage = () => message;
  return data;
}

export function vague<D>(
  data: D,
  code = StatusCodes.OK,
  message = "completed",
) {
  (<VagueResponse>data).getStatus = () => code;
  (<VagueResponse>data).getMessage = () => message;
  return data;
}
