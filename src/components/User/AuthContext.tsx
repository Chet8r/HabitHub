import React, { createContext, useContext, useState, ReactNode } from "react";
import { logoutUser } from "./account";
import { Navigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null); // Avoid using localStorage for tokens

  // const navigate = useNavigate();
  // const location = useLocation();

  const login = (token: string) => {
    setToken(token);
    // Optionally navigate or perform other actions
  };

  const logout = () => {
    setToken(null);
    // Clear cookies if necessary
    // You might need to trigger a logout endpoint to handle cookies on the server-side
    logoutUser().then(() => {
      <Navigate to="/login" />;
    });
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
