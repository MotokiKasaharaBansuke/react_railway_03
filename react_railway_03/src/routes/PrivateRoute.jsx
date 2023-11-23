import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useToken } from "../services/useTokenContext";
import { useFlashMessage } from "../services/useFlashMessageContext";

export const PrivateRoute = ({ children }) => {
  const { token } = useToken();
  const { setMessage } = useFlashMessage();
  const location = useLocation();

  if (!token) {
    setMessage("ログインしてください");
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
};
