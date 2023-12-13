import { Knex } from "knex";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

// Update with your config settings.
const knex_migration_table = "knex_migrations";

const config: Knex.Config = {
  client: "mysql2",
  connection: process.env.DATABASE_URI,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: knex_migration_table,
  },
};

module.exports = config;
