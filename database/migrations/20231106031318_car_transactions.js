exports.up = function (knex) {
  return knex.schema.createTable("car_transactions", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("user_id");
    table.string("destination");
    table.text("description");
    table.integer("passanger");
    table.text("passanger_description");
    table.enu("driver", ["Ya", "Tidak"]);
    table.datetime("datetime_start");
    table.datetime("datetime_taken").nullable();
    table.datetime("datetime_return").nullable();
    table.integer("car_id").nullable();
    table.string("driving_license").nullable();
    table.string("picture").nullable();
    table.enu("status", ["Dicek", "Ditolak", "Diterima", "Digunakan", "Selesai"]);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("car_transactions");
};
