import { Sequelize, type Options } from "@sequelize/core";
import config from "./config";
import { User } from "./models/User";
import Verifier from "./models/Verifier";
import Secret from "./models/Secret";
import Session from "./models/Session";

const options: Options = {
  dialect: "mysql",
  port: 3306,
  // models: await importModels(__dirname + "/models"),
  logging: false,
  models: [User, Verifier, Secret, Session],
};

export const sequelize = new Sequelize(config.database.uri, options);
