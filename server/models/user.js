// models/user.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // For password hashing

const userSchema = new mongoose.Schema({
    registrationId: { type: String, unique: true },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"], // Restrict to specific values
        required: true, // If gender is mandatory
    },
    height: {
        type: Number, // Store height in centimeters (or meters if needed)
        min: [0, "Height must be positive"], // Validate positive values
    },
    weight: {
        type: Number, // Store weight in kilograms
        min: [0, "Weight must be positive"], // Validate positive values
    }
    // Add any other fields you need
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);
export default User;
