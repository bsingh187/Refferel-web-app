import React from "react";
import { Navigate } from "react-router-dom";

const CommonRoutes = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" /> : element;
};

export default CommonRoutes;
