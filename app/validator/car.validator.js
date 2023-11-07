const { check, validationResult } = require("express-validator");

const store = [
  check("brand").not().isEmpty().withMessage("brand can not be empty!"),
  check("type").not().isEmpty().withMessage("type can not be empty!"),
  check("license").not().isEmpty().withMessage("license can not be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

const update = [
  check("brand").not().isEmpty().withMessage("brand can not be empty!"),
  check("type").not().isEmpty().withMessage("type can not be empty!"),
  check("license").not().isEmpty().withMessage("license can not be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

module.exports = {
  store,
  update,
};
