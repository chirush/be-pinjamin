exports.up = function (knex) {
  return knex.schema.createTable("room_transactions", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("user_id");
    table.integer("room_id");
    table.datetime("datetime_start");
    table.datetime("datetime_end");
    table.string("event");
    table.text("description");
    table.tinyint("participant");
    table.text("participant_description");
    table.enu("consumption", ["Ya", "Tidak"]);
    table.text("consumption_description").nullable();
    table.enu("status", ["Dicek", "Ditolak", "Diterima"]);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("room_transactions");
};
