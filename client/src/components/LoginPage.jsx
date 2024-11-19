import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { loginUser } from "../services/api"; // Import your API method for login
import { UserContext, UserProvider } from '../context/UserContext';

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
};

const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};

function LoginPage({ isOpen, onClose, setUser }) {
    const [form, setForm] = useState({
        username: "",
        password: "",
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
            const response = await loginUser(form); // Call the API method to log in the user
            if (response && response.token) {
                setSuccess("Login successful!");
                localStorage.setItem("token", response.token); // Store the token in localStorage
                setForm({ username: "", password: "" }); // Reset form
                setUser({ name: response.user.name, sub: response.user.id, picture: '', gender: response.user.gender, height: response.user.height, weight: response.user.weight, email: response.user.email });
                onClose(); // Close the modal
            } else {
                throw new Error(response?.message || "Invalid login response");
            }
        } catch (err) {
            setError(err.message || "Login failed."); // Handle error message
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
                <h2 className="text-2xl font-bold text-gray-100 mb-4">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-4">
                        <span className="text-gray-300">Username:</span>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
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
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-green-600"
                        >
                            Login
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

export default LoginPage;
