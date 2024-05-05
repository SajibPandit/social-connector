import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  let location = useLocation();

  if (!user?.id) {
    return <Navigate to="/login" />;
  }
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
