import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { refreshToken } from "./account";

const ProtectedRoute: React.FC = () => {
  const { token, login } = useAuth();

  React.useEffect(() => {
    const handleTokenRefresh = async () => {
      if (!token) {
        const newToken = await refreshToken();
        if (newToken) {
          login(newToken);
        }
      }
    };

    handleTokenRefresh();
  }, [token, login]);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
