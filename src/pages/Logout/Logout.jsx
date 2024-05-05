import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import toast from "react-hot-toast";

function Logout() {
  const navigate = useNavigate();
  const { clearUserData } = useContext(UserContext);

  useEffect(() => {
    navigate("/login");
    clearUserData();
    toast.success("User logged out successfully");
  }, []);

  return (
    <div>
      <p className="text-center">Logging out</p>
    </div>
  );
}

export default Logout;
