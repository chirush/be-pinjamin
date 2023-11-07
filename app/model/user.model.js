const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "email", "password", "phone", "role"],

      properties: {
        name: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
        phone: {
          type: "string",
        },
        role: {
          type: "string",
        },
      },
    };
  }
}

module.exports = User;
