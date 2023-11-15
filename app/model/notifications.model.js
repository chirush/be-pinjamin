const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Notifications extends Model {
  static get tableName() {
    return "notifications";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["user_id", "notification", "type", "status"],

      properties: {
        user_id: {
          type: "string",
        },
        notification: {
          type: "string",
        },
        type: {
          type: "string",
        },
        status: {
          type: "string",
        },
      },
    };
  }
}

module.exports = Notifications;
