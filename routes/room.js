const express = require("express");

const router = express.Router();

const RoomController = require("../app/controller/room.controller");
const RoomValidator = require("../app/validator/room.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /room:
 *  get:
 *     tags:
 *     - Room
 *     summary: Get all room
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/room", RoomController.index);

/**
 * @openapi
 * /room:
 *  post:
 *     tags:
 *     - Room
 *     summary: Add Room
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *               type: string
 *               example: Meeting Room 1
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
router.post("/room", RoomValidator.store, AuthMiddleware, RoomController.store);

/**
 * @openapi
 * /room/{id}:
 *  get:
 *     tags:
 *     - Room
 *     summary: Get room
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the room
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/room/:id", RoomController.show);

/**
 * @openapi
 * /room/{id}:
 *  put:
 *     tags:
 *     - Room
 *     summary: Update Room
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the room
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *               type: string
 *               example: Meeting Room 2
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
router.put("/room/:id", RoomValidator.update, AuthMiddleware, RoomController.update);

/**
 * @openapi
 * /room/{id}:
 *  delete:
 *     tags:
 *     - Room
 *     summary: Delete room
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the room
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/room/:id", AuthMiddleware, RoomController.destroy);


module.exports = router;
