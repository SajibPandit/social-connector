import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  let location = useLocation();

  if (loading) {
    return <h1>Loading..</h1>;
  }

  if (!user?.id) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }}></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
