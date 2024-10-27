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
 * tags:
 *   name: HealthRecords
 *   description: API endpoints for managing health records
 */

/**
 * @swagger
 * /api/health-records:
 *   get:
 *     tags: [HealthRecords]
 *     summary: Retrieve a list of health records
 *     responses:
 *       200:
 *         description: A list of health records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HealthRecord'
 *   post:
 *     tags: [HealthRecords]
 *     summary: Create a new health record
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
 * /api/health-records/{id}:
 *   get:
 *     tags: [HealthRecords]
 *     summary: Retrieve a health record by ID
 *     parameters:
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
 *     summary: Update a health record by ID
 *     parameters:
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
 *     summary: Delete a health record by ID
 *     parameters:
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

router.route("/:userId").get(getHealthRecords);

router.route("/").post(createHealthRecord);

router
    .route("/:id")
    .get(getHealthRecordById)
    .put(updateHealthRecord)
    .delete(deleteHealthRecord);

export default router;
