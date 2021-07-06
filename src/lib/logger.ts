import * as winston from "winston";
import config from "../config";

const consoleTransport = new winston.transports.Console({
  level: config.env === "development" ? "debug" : "info",
});

const { combine, colorize, align, label, timestamp, printf } = winston.format;

const transports = [consoleTransport];

const logger = winston.createLogger({
  transports,
  format: combine(
    colorize(),
    align(),
    label({ label: config.app.name }),
    timestamp(),
    printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    })
  ),
});

export default {
  info: (msg: string, data: any = null) =>
    logger.info(
      `${msg} ${
        data ? (typeof data === "string" ? data : JSON.stringify(data)) : ""
      }`
    ),
  error: (msg: string, err: any = null) =>
    logger.error(
      `${msg} ${
        err ? (typeof err === "string" ? err : JSON.stringify(err)) : ""
      }`
    ),
};
