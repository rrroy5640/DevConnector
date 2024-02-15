import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const CreateProfileRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useSelector((state => state.auth.isAuthenticated));
  const profile = useSelector((state => state.profile.profile));
  const isLoading = useSelector((state => state.auth.loading));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (profile !== null) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};
