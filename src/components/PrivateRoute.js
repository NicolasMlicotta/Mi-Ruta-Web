import { Navigate } from "react-router-dom";
import { useContext } from "react";

import UserContext from "../context/UserContext";
const PrivateRoute = ({ children }) => {
  const { userData } = useContext(UserContext);
  if (!userData) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};
export default PrivateRoute;
