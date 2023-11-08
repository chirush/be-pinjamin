const express = require("express");

const router = express.Router();

const CarTransactionController = require("../app/controller/car_transaction.controller");
const CarTransactionValidator = require("../app/validator/car_transaction.validator");
const upload = require('../middleware/upload.middleware');
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /car-transaction:
 *  get:
 *     tags:
 *     - Car Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Get all car transaction
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/car-transaction", AuthMiddleware, CarTransactionController.index);

/**
 * @openapi
 * /car-transaction:
 *  post:
 *     tags:
 *     - Car Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Book a car
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - destination
 *              - description
 *              - passanger
 *              - passanger_description
 *              - driver
 *              - participant
 *              - participant_description
 *              - consumption
 *              - consumption_description
 *            properties:
 *              car_id:
 *               type: integer
 *               example: 1
 *              date:
 *               type: string
 *               format: date
 *              time_start:
 *               type: string
 *               format: time
 *               example: 07:00:00
 *              time_end:
 *               type: string
 *               format: time
 *               example: 09:00:00
 *              event:
 *               type: string
 *               example: IT Forum
 *              description:
 *               type: string
 *               example: For meeting purposes
 *              participant:
 *               type: integer
 *               example: 14
 *              consumption:
 *               type: string
 *               example: 1
 *              note:
 *               type: string
 *               example: Lorem Ipsum
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
router.post("/car-transaction", AuthMiddleware, CarTransactionValidator.store, CarTransactionController.store);

/**
 * @openapi
 * /car-transaction/{id}:
 *  get:
 *     tags:
 *     - Car Transaction
 *     security:
 *       - bearerAuth: []
 *     summary: Detail car transaction
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the car/transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/car-transaction/:id", AuthMiddleware, CarTransactionController.show);

/**
 * @openapi
 * /car-transaction/{id}:
 *  put:
 *     tags:
 *     - Car Transaction
 *     summary: Update the booked car (include confirmation)
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the car transaction
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - car_id
 *              - date
 *              - time_start
 *              - time_end
 *              - status
 *            properties:
 *              car_id:
 *               type: integer
 *               example: 1
 *              date:
 *               type: string
 *               format: date
 *              time_start:
 *               type: string
 *               format: time
 *               example: 07:00:00
 *              time_end:
 *               type: string
 *               format: time
 *               example: 09:00:00
 *              status:
 *               type: string
 *               example: Diterima
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
router.put("/car-transaction/:id", CarTransactionValidator.update, AuthMiddleware, CarTransactionController.update);

/**
 * @openapi
 * /car-transaction/{id}:
 *  delete:
 *     tags:
 *     - Car Transaction
 *     summary: Delete car transaction
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the car/transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/car-transaction/:id", AuthMiddleware, CarTransactionController.destroy);


module.exports = router;
