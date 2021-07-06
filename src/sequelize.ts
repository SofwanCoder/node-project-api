import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const options: SequelizeOptions = {
  dialect: "mysql",
  database: process.env.DATABASE_NAME,
  port: 3306,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  models: [__dirname + "/models"],
  logging: false,
};

export const sequelize = new Sequelize(options);
