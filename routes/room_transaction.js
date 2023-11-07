const express = require("express");

const router = express.Router();

const RoomController = require("../app/controller/room_transaction.controller");
const RoomValidator = require("../app/validator/room_transaction.validator");
const upload = require('../middleware/upload.middleware');
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /room/transaction:
 *  get:
 *     tags:
 *     - Room Transaction
 *     summary: Get all room transaction
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/room/transaction", RoomController.index);

/**
 * @openapi
 * /room/transaction:
 *  post:
 *     tags:
 *     - Room Transaction
 *     summary: Book a room
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - phone
 *              - room_id
 *              - datetime_start
 *              - duration
 *              - description
 *            properties:
 *              name:
 *               type: string
 *               example: Fitrah Firdaus
 *              phone:
 *               type: string
 *               example: 089501027942
 *              room_id:
 *               type: integer
 *               example: 1
 *              datetime_start:
 *               type: string
 *               format: date-time
 *              duration:
 *               type: string
 *               format: duration
 *              description:
 *               type: string
 *               example: For meeting purposes
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
router.post("/room/transaction", RoomValidator.store, RoomController.store);

/**
 * @openapi
 * /room/transaction/{id}:
 *  get:
 *     tags:
 *     - Room Transaction
 *     summary: Detail room transaction
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the room/transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/room/transaction/:id", RoomController.show);

/**
 * @openapi
 * /room/transaction/{id}:
 *  put:
 *     tags:
 *     - Room Transaction
 *     summary: Update room transaction
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the room/transaction
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - phone
 *              - room_id
 *              - datetime_start
 *              - duration
 *              - description
 *            properties:
 *              name:
 *               type: string
 *               example: Fitrah Firdaus
 *              phone:
 *               type: string
 *               example: 089501027942
 *              room_id:
 *               type: integer
 *               example: 1
 *              datetime_start:
 *               type: string
 *               format: date-time
 *              duration:
 *               type: string
 *               format: duration
 *              description:
 *               type: string
 *               example: For meeting purposes
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
router.put("/room/transaction/:id", RoomValidator.update, AuthMiddleware, RoomController.update);

/**
 * @openapi
 * /room/transaction/{id}:
 *  delete:
 *     tags:
 *     - Room Transaction
 *     summary: Delete room transaction
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the room/transaction
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/room/transaction/:id", AuthMiddleware, RoomController.destroy);


module.exports = router;
