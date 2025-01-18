import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserProfile } from "../Auth/auth";
import { Spinner } from "react-bootstrap"; // Using Bootstrap Spinner

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthenticated(false);
      return;
    }

    getUserProfile()
      .then(() => setAuthenticated(true))
      .catch(() => {
        localStorage.removeItem("token"); // Remove invalid token
        setAuthenticated(false);
      });
  }, []);

  if (authenticated === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return authenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
