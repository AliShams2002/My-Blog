"use client";

import { useState, createContext, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  getAuthCookies,
  handleDeleteCookies,
} from "@/app/login/_partials/action";
import { eventEmitter } from "@/utils/eventEmitter";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const isAuthenticated = !!token;

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

  const login = async ({ userData, accessToken }) => {
    setUser(userData);
    setToken(accessToken);
  };

  const logout = async () => {
    await handleDeleteCookies();
    setUser(null);
    setToken(null);
    toast.success("عملیات خروج با موفقیت انجام شد");
    eventEmitter.emit("refresh-header");
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
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
