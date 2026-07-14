import React from "react";
import { Navigate } from "react-router-dom";
import { getStoredAuth } from "../../utils/auth";

const ProtectedRoutes = ({ children, allowedRole }) => {
  try {
    const auth = getStoredAuth();

    if (!auth || !auth.token) {
      return <Navigate to="/" replace />;
    }

    if (allowedRole) {
      const normalizedRole = auth.role?.toString().trim().toLowerCase();
      const buyerRoles = ['user', 'customer', 'retailer', 'wholesaler'];
      const isBuyerRoute = allowedRole === 'user';
      const hasBuyerRole = buyerRoles.includes(normalizedRole);

      if (isBuyerRoute && !hasBuyerRole) {
        return <Navigate to="/" replace />;
      }

      if (!isBuyerRoute && normalizedRole !== allowedRole) {
        return <Navigate to="/" replace />;
      }
    }

    return children;
  } catch {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoutes;