exports.up = function(knex) {
  return knex.schema.createTable("locations", (table) => {
    table.integer("id").notNullable().primary();

    table.text("name").notNullable();

    table.text("address").notNullable();

    table.float("latitude");

    table.float("longitude");

    table.text("url");
  });
};

exports.down = function(knex, Promise) {};
