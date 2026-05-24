import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("insm_user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Verify token with backend
          const response = await api.get("/auth/me");
          setUser({ ...response.data, token: parsedUser.token });
        } catch (error) {
          console.error("Auth verification failed", error);
          localStorage.removeItem("insm_user");
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const userData = response.data;
      setUser(userData);
      localStorage.setItem("insm_user", JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await api.post("/auth/signup", { name, email, password });
      const userData = response.data;
      setUser(userData);
      localStorage.setItem("insm_user", JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Signup failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("insm_user");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}
    >
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
