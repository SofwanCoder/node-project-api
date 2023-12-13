import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists("user", function (table) {
    table.string("id", 26).primary();
    table.string("firstname").notNullable();
    table.string("lastname").notNullable();
    table.string("phone", 20).nullable();
    table.string("email", 100).notNullable().unique();
    table.string("password", 100).notNullable();
    table.boolean("is_verified").defaultTo(false);
    table.boolean("is_2fa_enabled").defaultTo(false);
    table.datetime("created_at").defaultTo(knex.fn.now());
    table
      .datetime("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user");
}
