const express = require("express");

const router = express.Router();

const AuthController = require("../app/controller/auth.controller");
const AuthValidator = require("../app/validator/auth.validator");

/**
 * @openapi
 * /login:
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *               type: string
 *               example: admin@example.com
 *              password:
 *               type: string
 *               example: password
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/login", AuthValidator.login, AuthController.login);

/**
 * @openapi
 * /register:
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Register
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *              - phone
 *              - division
 *            properties:
 *              name:
 *               type: string
 *               example: Fitrah Firdaus
 *              email:
 *               type: string
 *               example: admin@example.com
 *              password:
 *               type: string
 *               example: password
 *              phone:
 *               type: string
 *               example: 089501027942
 *              division:
 *               type: string
 *               example: internship
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/register", AuthValidator.register, AuthController.register);

module.exports = router;
