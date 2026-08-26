"use client";

import { useState, createContext, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  getAuthCookies,
  handleDeleteCookies,
} from "@/app/login/_partials/action";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Loading user data
  useEffect(() => {
    setIsLoading(true);
    const loadUser = async () => {
      const result = await getAuthCookies();
      const savedToken = result.token;
      const savedUser = result.user;
      if (savedUser) setUser(savedUser);
      if (savedToken) setToken(savedToken);
    };
    loadUser();
    setIsLoading(false);
  }, []);

  // Login
  const login = async ({ userData, accessToken }) => {
    setUser(userData);
    setToken(accessToken);
  };

  // Logout
  const logout = async () => {
    await handleDeleteCookies();
    setUser(null);
    setToken(null);
    toast.success("عملیات خروج با موفقیت انجام شد");
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoading,
        setIsLoading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AppProvider");
  }
  return context;
};
