const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Cars extends Model {
  static get tableName() {
    return "cars";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["brand", "type", "license"],

      properties: {
        name: {
          type: "string",
        },
        type: {
          type: "string",
        },
        license: {
          type: "string",
        },
      },
    };
  }
}

module.exports = Cars;
