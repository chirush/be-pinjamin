const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Rooms extends Model {
  static get tableName() {
    return "rooms";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name"],

      properties: {
        name: {
          type: "string",
        },
      },
    };
  }
}

module.exports = Rooms;
