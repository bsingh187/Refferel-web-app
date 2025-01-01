import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/" />;
};

export default PrivateRoutes;
