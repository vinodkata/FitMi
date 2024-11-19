import React, { useState } from "react";
import { motion } from "framer-motion";
import { registerUser } from "../services/api"; // Ensure this is your actual API method

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
};

const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};

function UserRegistration({ isOpen, onClose }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        gender: "male", // Default gender
        height: "",
        weight: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setSuccess(""); // Clear previous success messages

        try {
            const response = await registerUser(form); // Call the API method to register the user
            setSuccess(response.message); // Handle success message
            setForm({
                name: "",
                email: "",
                password: "",
                gender: "male",
                height: "",
                weight: "",
            }); // Reset form
        } catch (err) {
            setError(err.message || "Registration failed."); // Handle error message
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                <h2 className="text-2xl font-bold text-gray-100 mb-4">User Registration</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-4">
                        <span className="text-gray-300">Name:</span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-700 text-gray-100 border border-gray-600 p-3 rounded-md mt-1"
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-300">Email:</span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-700 text-gray-100 border border-gray-600 p-3 rounded-md mt-1"
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-300">Password:</span>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-700 text-gray-100 border border-gray-600 p-3 rounded-md mt-1"
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-300">Gender:</span>
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full bg-gray-700 text-gray-100 border border-gray-600 p-3 rounded-md mt-1"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-300">Height (cm):</span>
                        <input
                            type="number"
                            name="height"
                            value={form.height}
                            onChange={handleChange}
                            min="0"
                            required
                            className="w-full bg-gray-700 text-gray-100 border border-gray-600 p-3 rounded-md mt-1"
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-300">Weight (kg):</span>
                        <input
                            type="number"
                            name="weight"
                            value={form.weight}
                            onChange={handleChange}
                            min="0"
                            required
                            className="w-full bg-gray-700 text-gray-100 border border-gray-600 p-3 rounded-md mt-1"
                        />
                    </label>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-green-600"
                        >
                            Register
                        </button>
                        <button
                            type="button"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-gray-700"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default UserRegistration;
