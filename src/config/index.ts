import app from "./app";
import jwt from "./jwt";
import cors from "./cors";
import smtp from "./smtp";
import database from "./database";

const env = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3000;

export const config = {
  env,
  port,
  jwt,
  app,
  smtp,
  cors,
  database,
};

export default config;
