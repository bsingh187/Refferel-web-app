import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ element }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? element : <Navigate to="/" />;
};

export default PrivateRoutes;
