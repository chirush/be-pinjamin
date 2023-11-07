const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class CarTransactions extends Model {
  static get tableName() {
    return "car_transactions";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["user_id", "car_id", "datetime_start", "datetime_end", "description", "status"],

      properties: {
        user_id: {
          type: "integer",
        },
        phone: {
          type: "string",
        },
        driving_license: {
          type: "string",
        },
        selfie: {
          type: "string",
        },
        car_id: {
          type: "integer",
        },
        datetime_start: {
          type: "string",
        },
        datetime_end: {
          type: "string",
        },
        datetime_return: {
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

module.exports = CarTransactions;
