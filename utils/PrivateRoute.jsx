"use client";

import SpinnerLoading from "@/components/shared/SpinnerLoading";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, token, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      window.location.href = "/login";
    } else if (isAuthenticated && user.role !== "admin") {
      window.location.href = "/";
    }
  }, [isAuthenticated, isLoading, router, token, user]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="w-8 h-8 flex items-center justify-center">
        <SpinnerLoading width="v-8" height="v-8" />
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
