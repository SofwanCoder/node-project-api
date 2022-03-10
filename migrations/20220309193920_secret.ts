import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("secret", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("user.id")
      .onDelete("CASCADE");
    table.string("token").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("secret");
}
