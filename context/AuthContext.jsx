"use client";

import { useState, createContext, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = Cookies.get("token");
    const savedUser = Cookies.get("user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));

    setIsLoading(false);
  }, []);

  const login = ({ userData, accessToken }) => {
    setUser(userData);
    setToken(accessToken);

    Cookies.set("token", accessToken, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    Cookies.set("user", JSON.stringify(userData), {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    setToken(null);
    toast.success("عملیات خروج با موفقیت انجام شد");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
