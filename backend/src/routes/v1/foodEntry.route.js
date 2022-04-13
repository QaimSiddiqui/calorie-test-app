const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const foodEntryValidation = require('../../validations/foodEntry.validation');
const foodEntryController = require('../../controllers/foodEntry.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageFoodEntries'), validate(foodEntryValidation.createFoodEntry), foodEntryController.createFoodEntry)
  .get(auth('getFoodEntries'), validate(foodEntryValidation.getFoodEntries), foodEntryController.getFoodEntries);

router
  .route('/:foodEntryId')
  .get(auth('getFoodEntries'), validate(foodEntryValidation.getFoodEntry), foodEntryController.getFoodEntry)
  .patch(auth('manageFoodEntries'), validate(foodEntryValidation.updateFoodEntry), foodEntryController.updateFoodEntry)
  .delete(auth('manageFoodEntries'), validate(foodEntryValidation.deleteFoodEntry), foodEntryController.deleteFoodEntry);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Food Entries
 *   description: Food Entry management and retrieval
 */

/**
 * @swagger
 * /food-entries:
 *   post:
 *     summary: Create a foodEntry
 *     tags: [FoodEntries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - price
 *               - calories
 *               - date
 *             properties:
 *               productName:
 *                 type: string
 *               price:
 *                 type: number
 *               calories:
 *                 type: number
 *               date:
 *                  type: string
 *             example:
 *               productName: Pizza
 *               price: 200
 *               calories: 0.2
 *               date: 2022-04-04T20:28:04.994Z
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/FoodEntry'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all foodEntries
 *     description: Only admins can retrieve all foodEntries.
 *     tags: [FoodEntries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of foodEntries
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Start Date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: End Date
 *       - in: query
 *         name: isMonthView
 *         schema:
 *           type: boolean
 *         description: is Month view query
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *         description: selected month query
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FoodEntry'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /food-entries/{id}:
 *   get:
 *     summary: Get a food Entry
 *     description: Logged in foodEntries can fetch only their own food Entry information. Only admins can fetch other food Entries.
 *     tags: [FoodEntries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: FoodEntry id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/FoodEntry'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a foodEntry
 *     description: Logged in food Entries can only update their own information. Only admins can update other food Entries.
 *     tags: [FoodEntries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: FoodEntry id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               price:
 *                 type: number
 *               calories:
 *                 type: number
 *               date:
 *                  type: string
 *             example:
 *               productName: Pizza
 *               price: 200
 *               calories: 0.2
 *               date: 2022-04-04T20:28:04.994Z
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/FoodEntry'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a foodEntry
 *     description: Logged in foodEntries can delete only themselves. Only admins can delete other foodEntries.
 *     tags: [FoodEntries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: FoodEntry id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
