import express from "express";
import {
    getHealthRecords,
    createHealthRecord,
    getHealthRecordById,
    updateHealthRecord,
    deleteHealthRecord,
} from "../controllers/healthRecordController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     HealthRecord:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the health record
 *           example: "2024-10-26"
 *         bodyTemperature:
 *           type: number
 *           description: Body temperature of the user
 *           example: 98.6
 *         bloodPressure:
 *           type: object
 *           properties:
 *             systolic:
 *               type: number
 *               description: Systolic blood pressure
 *               example: 120
 *             diastolic:
 *               type: number
 *               description: Diastolic blood pressure
 *               example: 80
 *         heartRate:
 *           type: number
 *           description: Heart rate of the user
 *           example: 72
 *         bmi:
 *           type: number
 *           description: Body Mass Index of the user
 *           example: 22.5
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time the record was created
 *           example: "2024-10-26T14:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time the record was last updated
 *           example: "2024-10-26T14:30:00Z"
 *         userId:
 *           type: string
 *           description: ID of the user to whom the record belongs
 *           example: "60c72b2f5f1b2c0015c001f1"
 */

/**
 * @swagger
 * tags:
 *   name: HealthRecords
 *   description: API endpoints for managing health records
 */

/**
 * @swagger
 * /api/health-records/{userId}:
 *   get:
 *     tags: [HealthRecords]
 *     summary: Retrieve a list of health records for a specific user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve health records for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of health records for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HealthRecord'
 *   post:
 *     tags: [HealthRecords]
 *     summary: Create a new health record for a specific user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthRecord'
 *     responses:
 *       201:
 *         description: Health record created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthRecord'
 */

/**
 * @swagger
 * /api/health-records/{userId}/{id}:
 *   get:
 *     tags: [HealthRecords]
 *     summary: Retrieve a health record by ID for a specific user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the health record to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A health record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthRecord'
 *       404:
 *         description: Health record not found
 *   put:
 *     tags: [HealthRecords]
 *     summary: Update a health record by ID for a specific user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the health record to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthRecord'
 *     responses:
 *       200:
 *         description: Health record updated
 *       404:
 *         description: Health record not found
 *   delete:
 *     tags: [HealthRecords]
 *     summary: Delete a health record by ID for a specific user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the health record to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Health record deleted
 *       404:
 *         description: Health record not found
 */

// Define routes with userId as a parameter
router.route("/:userId").get(getHealthRecords);
router.route("/:userId").post(createHealthRecord);

// Define routes with both userId and health record id
router
    .route("/:userId/:id")
    .get(getHealthRecordById)
    .put(updateHealthRecord)
    .delete(deleteHealthRecord);

export default router;
