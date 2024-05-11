import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Create the context
const UserContext = createContext();

// Define the provider component
export const UserProvider = ({ children }) => {
  // Define the state and setter for user data
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    // Load user data from local storage on component mount
    async function fetchData() {
      const storedUser = localStorage.getItem("zozoAuth");
      const parsedData = JSON.parse(storedUser);

      const referuserdata = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user-info`,
        {
          id: parsedData?.id,
        },
        {
          headers: {
            authorization: `Bearer ${parsedData?.token}`,
          },
        }
      );
      setLoading(false);
      console.log("hhh", referuserdata.data.user);
      setUser(referuserdata.data.user);
    }
    try {
      await fetchData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setUser(null);
      localStorage.removeItem("zozoAuth");
      console.log(error);
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

  //Function to activate login
  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  // Return the provider component
  return (
    <UserContext.Provider
      value={{
        user,
        setUserData,
        clearUserData,
        loading,
        startLoading,
        stopLoading,
      }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserContext;
