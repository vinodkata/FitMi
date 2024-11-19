import express from 'express';
import { registerUser, loginUser, updateUser } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: secretpassword
 *               gender:
 *                 type: string
 *                 description: The gender of the user
 *                 example: Male
 *               height:
 *                 type: number
 *                 description: The height of the user in centimeters
 *                 example: 175
 *               weight:
 *                 type: number
 *                 description: The weight of the user in kilograms
 *                 example: 70
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the registered user
 *                       example: 60c72b2f5f1b2c0015c001f1
 *                     name:
 *                       type: string
 *                       description: The name of the registered user
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       description: The email of the registered user
 *                       example: john.doe@example.com
 *                     gender:
 *                       type: string
 *                       description: The gender of the registered user
 *                       example: Male
 *                     height:
 *                       type: number
 *                       description: The height of the registered user
 *                       example: 175
 *                     weight:
 *                       type: number
 *                       description: The weight of the registered user
 *                       example: 70
 *       400:
 *         description: All fields are required
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *                 description: The username or email of the user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: secretpassword
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: The JWT token for authentication
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the user
 *                       example: 60c72b2f5f1b2c0015c001f1
 *                     name:
 *                       type: string
 *                       description: The name of the user
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       description: The email of the user
 *                       example: john.doe@example.com
 *                     gender:
 *                       type: string
 *                       description: The gender of the user
 *                       example: Male
 *                     height:
 *                       type: number
 *                       description: The height of the user
 *                       example: 175
 *                     weight:
 *                       type: number
 *                       description: The weight of the user
 *                       example: 70
 *       400:
 *         description: Invalid username/email or password
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags: [Auth]
 *     summary: Update user information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: john.doe@example.com
 *               gender:
 *                 type: string
 *                 description: The gender of the user
 *                 example: Male
 *               height:
 *                 type: number
 *                 description: The height of the user in centimeters
 *                 example: 180
 *               weight:
 *                 type: number
 *                 description: The weight of the user in kilograms
 *                 example: 75
 *               password:
 *                 type: string
 *                 description: The new password of the user
 *                 example: newpassword
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60c72b2f5f1b2c0015c001f1
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     gender:
 *                       type: string
 *                       example: Male
 *                     height:
 *                       type: number
 *                       example: 180
 *                     weight:
 *                       type: number
 *                       example: 75
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/users/:id', updateUser);

export default router;
