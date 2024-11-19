const API_URL = "http://localhost:5000/api/health-records";
const AUTH_API_URL = "http://localhost:5000/api/register";
const LOGIN_API_URL = "http://localhost:5000/api/login";
const UPDATE_USER_API_URL = "http://localhost:5000/api/users";

// Fetch all health records by user ID
export const fetchHealthRecords = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch health records");
        return await response.json();
    } catch (error) {
        console.error("Error fetching health records:", error);
        return null;
    }
};

// Create a new health record
export const createHealthRecord = async (record) => {
    try {
        const response = await fetch(`${API_URL}/${record.userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(record),
        });
        if (!response.ok) throw new Error("Failed to create health record");
        return await response.json();
    } catch (error) {
        console.error("Error creating health record:", error);
        return null;
    }
};

// Fetch a specific health record by its ID
export const fetchHealthRecordById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch health record");
        return await response.json();
    } catch (error) {
        console.error("Error fetching health record by ID:", error);
        return null;
    }
};

// Update a health record
export const updateHealthRecord = async (id, updatedRecord) => {
    try {
        const response = await fetch(`${API_URL}/${updatedRecord.userId}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRecord),
        });
        if (!response.ok) throw new Error("Failed to update health record");
        return await response.json();
    } catch (error) {
        console.error("Error updating health record:", error);
        return null;
    }
};

// Delete a health record
export const deleteHealthRecord = async (id, record) => {
    try {
        const response = await fetch(`${API_URL}/${record.userId}/${ id }`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete health record");
    } catch (error) {
        console.error("Error deleting health record:", error);
    }
};

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await fetch(AUTH_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to register user");
        }
        return await response.json();
    } catch (error) {
        console.error("Error registering user:", error);
        return null;
    }
};

// Log in a user
export const loginUser = async (credentials) => {
    try {
        const response = await fetch(LOGIN_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to log in");
        }
        return await response.json(); // Returns token and user data
    } catch (error) {
        console.error("Error logging in:", error);
        return null;
    }
};

// Update user details
export const updateUser = async (userId, updatedUser) => {
    try {
        const response = await fetch(`${UPDATE_USER_API_URL}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update user");
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating user:", error);
        return null;
    }
};
