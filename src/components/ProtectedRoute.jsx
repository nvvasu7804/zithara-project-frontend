import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Navigate to="/login" />;

  if (role === "admin" && user?.role !== "admin")
    return <Navigate to="/chat" />;

  return children;
};

export default ProtectedRoute;
