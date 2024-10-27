// src/context/UserContext.jsx

import React, { createContext, useContext, useState } from 'react';

// Create a context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Export the context and the custom hook to use it
export { UserContext }; // Ensure UserContext is exported
export const useUser = () => {
    return useContext(UserContext);
};
