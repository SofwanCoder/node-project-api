import { Knex } from "knex";

enum Source {
  Reset = "reset",
  Verify = "verify",
  Auth = "auth",
}
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists("verifier", (table) => {
    table.string("id", 26).primary();
    table.string("user_id", 26).references("user.id").onDelete("CASCADE");
    table.enum("source", Object.values(Source)).notNullable();
    table.string("code").notNullable();
    table.string("token").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("verifier");
}
