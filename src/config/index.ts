import app from "./app";
import jwt from "./jwt";
import cors from "./cors";
import smtp from "./smtp";
import database from "./database";

export const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT,
  jwt,
  app,
  smtp,
  cors,
  database,
};

export default config;
