import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/signin");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
