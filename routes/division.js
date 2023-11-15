const express = require("express");

const router = express.Router();

const DivisionController = require("../app/controller/division.controller");
const DivisionValidator = require("../app/validator/division.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /division:
 *  get:
 *     tags:
 *     - Division
 *     security:
 *       - bearerAuth: []
 *     summary: Get all division
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/division", AuthMiddleware, DivisionController.index);

/**
 * @openapi
 * /division:
 *  post:
 *     tags:
 *     - Division
 *     summary: Add Division
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
 *              - picture
 *            properties:
 *              name:
 *               type: string
 *               example: Internship
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
router.post("/division", upload.divisionUpload.single('picture'), DivisionValidator.store, AuthMiddleware, DivisionController.store);

/**
 * @openapi
 * /division/{id}:
 *  get:
 *     tags:
 *     - Division
 *     summary: Get division
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the division
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/division/:id", AuthMiddleware, DivisionController.show);

/**
 * @openapi
 * /division/{id}:
 *  put:
 *     tags:
 *     - Division
 *     summary: Update Division
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the division
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
 *               example: Internship
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
router.put("/division/:id", DivisionValidator.update, AuthMiddleware, DivisionController.update);

/**
 * @openapi
 * /division/{id}:
 *  delete:
 *     tags:
 *     - Division
 *     summary: Delete division
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the division
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/division/:id", AuthMiddleware, DivisionController.destroy);


module.exports = router;
