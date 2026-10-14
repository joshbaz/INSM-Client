import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../store/context/AuthContext";

const ProtectedRoute = ({ children, requiredRole, redirectTo = "/login" }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-navy-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to specified login route but save the current location they were trying to go to
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // requiredRole may be one role or a list of allowed roles
  const allowed = [].concat(requiredRole || []).map((r) => r.toUpperCase());
  if (allowed.length && !allowed.includes(user?.role?.toUpperCase())) {
    // Send people to their own area: admins to the executive portal, equippers/mentors to the terminal
    const role = user?.role?.toUpperCase();
    const home = role === "ADMIN" ? "/executive/home" : ["EQUIPPER", "MENTOR"].includes(role) ? "/terminal" : "/";
    return <Navigate to={home} replace />;
  }

  return children;
};

export default ProtectedRoute;
