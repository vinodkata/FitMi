import User from '../models/user.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (req, res, next) => {
    const { name, email, password, gender, height, weight } = req.body;

    // Validate input
    if (!name || !email || !password || !gender || !height || !weight) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const registrationId = new mongoose.Types.ObjectId().toString();
        const hashedPassword = password;//await bcrypt.hash(password, 10); // Hash password
        const newUser = new User({
            registrationId,
            name,
            email,
            password: hashedPassword,
            gender,
            height,
            weight,
        });

        await newUser.save();

        // Respond with the created user (excluding the password)
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                gender: newUser.gender,
                height: newUser.height,
                weight: newUser.weight,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Update User
export const updateUser = async (req, res, next) => {
    const { id } = req.params; // User ID from route parameters
    const { name, email, gender, height, weight } = req.body;
    // Validate input
    if (!name && !email && !gender && !height && !weight) {
        return res.status(400).json({ message: "At least one field is required for update" });
    }
    console.log("User Update Lev", id);
    try {
        console.log("User Update ", { registrationId:id },
            { name, email, gender, height, weight },
            { new: true, runValidators: true });
        // Find and update the user
        const updatedUser = await User.findOneAndUpdate(
            { registrationId: id },
            { name, email, gender, height, weight },
            { new: true, runValidators: true } // Return updated user and enforce schema validation
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with updated user details
        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: updatedUser.registrationId,
                name: updatedUser.name,
                email: updatedUser.email,
                gender: updatedUser.gender,
                height: updatedUser.height,
                weight: updatedUser.weight
            },
        });
    } catch (error) {
        next(error);
    }
};

// Login User
export const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: "Both username/email and password are required" });
    }

    try {
        // Fetch the user by username or email
        const user = await User.findOne({
            $or: [{ email: username }, { name: username }],
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid username/email or password" });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username/email or password" });
        }

        // Generate a JWT token for the user
        const token = jwt.sign(
            { id: user.registrationId, email: user.email, name: user.name },
            process.env.JWT_SECRET, // Store secret key in environment variables
            { expiresIn: "1h" } // Token expiry time
        );

        // Respond with success message and token
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.registrationId,
                name: user.name,
                email: user.email,
                gender: user.gender,
                height: user.height,
                weight: user.weight,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        next(error);
    }
};
