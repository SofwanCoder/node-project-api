"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Update with your config settings.
const config = {
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABSE_PASSWORD,
            database: process.env.DATABASE_NAME,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    production: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            user: "u-wg04z",
            password: "wg04zC",
            database: "bloomers_db",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
module.exports = config;
