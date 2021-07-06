import app from "./app";
import jwt from "./jwt";

export const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT,
  allowOrigin: process.env.ALLOW_ORIGIN,
  jwt,
  app,
};

export default config;
