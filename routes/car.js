const express = require("express");

const router = express.Router();

const CarController = require("../app/controller/car.controller");
const CarValidator = require("../app/validator/car.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /car:
 *  get:
 *     tags:
 *     - Car
 *     summary: Get all car
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/car", CarController.index);

/**
 * @openapi
 * /car:
 *  post:
 *     tags:
 *     - Car
 *     summary: Add Car
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - brand
 *              - type
 *              - license
 *            properties:
 *              brand:
 *               type: string
 *               example: Volkswagen
 *              type:
 *               type: string
 *               example: Type 1
 *              license:
 *               type: string
 *               example: AB12345
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/car", CarValidator.store, AuthMiddleware, CarController.store);

/**
 * @openapi
 * /car/{id}:
 *  get:
 *     tags:
 *     - Car
 *     summary: Get car
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the car
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/car/:id", CarController.show);

/**
 * @openapi
 * /car/{id}:
 *  put:
 *     tags:
 *     - Car
 *     summary: Update Car
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the car
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - brand
 *              - type
 *              - license
 *            properties:
 *              brand:
 *               type: string
 *               example: Volkswagen
 *              type:
 *               type: string
 *               example: Type 2
 *              license:
 *               type: string
 *               example: AB12345
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.put("/car/:id", CarValidator.update, AuthMiddleware, CarController.update);

/**
 * @openapi
 * /car/{id}:
 *  delete:
 *     tags:
 *     - Car
 *     summary: Delete car
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the car
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/car/:id", AuthMiddleware, CarController.destroy);


module.exports = router;
