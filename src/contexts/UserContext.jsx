import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Create the context
const UserContext = createContext();

// Define the provider component
export const UserProvider = ({ children }) => {
  // Define the state and setter for user data
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user data from local storage on component mount
    const storedUser = localStorage.getItem("zozoAuth");
    console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to set user data
  const setUserData = (userData) => {
    setUser(userData);
  };

  // Function to clear user data (e.g., on logout)
  const clearUserData = () => {
    setUser(null);
    localStorage.removeItem("zozoAuth");
  };

  // Return the provider component
  return (
    <UserContext.Provider value={{ user, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

// Export the context
export default UserContext;
