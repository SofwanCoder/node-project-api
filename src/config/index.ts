import app from "./app";
import jwt from "./jwt";
import cors from "./cors";
import smtp from "./smtp";
import database from "./database";
import dir from "./dir";
import * as process from "process";

const env = process.env.NODE_ENV || "development";
const port = process.env.PORT || 8080;

export const config = {
  env,
  port,
  jwt,
  app,
  smtp,
  cors,
  database,
  dir,
  unleash: {
    url: process.env.UNLEASH_API_URL || "http://localhost:4242/api",
    appName:
      process.env.UNLEASH_APP_NAME || process.env.NODE_ENV || "development",
    instanceId: process.env.UNLEASH_INSTANCE_ID,
  },
};

export default config;
