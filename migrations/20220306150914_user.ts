import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("user", function (table) {
    table.increments("id");
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("phone", 20).notNullable();
    table.string("avatar").nullable();
    table.string("email", 100).notNullable().unique();
    table.string("password", 100).notNullable();
    table.datetime("created_at").defaultTo(knex.fn.now());
    table
      .datetime("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user");
}
