import React from "react";
import { Navigate } from "react-router-dom";

const CommonRoutes = ({ element }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? <Navigate to="/home" /> : element;
};

export default CommonRoutes;
