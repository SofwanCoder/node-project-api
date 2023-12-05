import { Sequelize, Options, importModels } from "@sequelize/core";
import config from "./config";

const options: Options = {
  dialect: "mysql",
  port: 3306,
  // models: await importModels(__dirname + "/models"),
  logging: false,
};

export const sequelize = new Sequelize(config.database.uri, options);
