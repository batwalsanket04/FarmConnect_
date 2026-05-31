import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, allowedRole }) => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));

    // If not logged in
    if (!auth || !auth.token) {
      console.warn("No authentication token found. Redirecting to home.");
      return <Navigate to="/" replace />;
    }

    // If allowedRole is specified and user role doesn't match
    if (allowedRole && auth.role !== allowedRole) {
      console.warn(`Access denied: Required role '${allowedRole}', but user has role '${auth.role}'`);
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    console.error("Error in ProtectedRoutes:", error);
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoutes;