const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class RoomTransactions extends Model {
  static get tableName() {
    return "room_transactions";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "room_id", "datetime_start", "description", "status"],

      properties: {
        name: {
          type: "string",
        },
        phone: {
          type: "string",
        },
        room_id: {
          type: "integer",
        },
        datetime_start: {
          type: "string",
        },
        datetime_end: {
          type: "string",
        },
        description: {
          type: "string",
        },
        status: {
          type: "string",
        },
      },
    };
  }
}

module.exports = RoomTransactions;
