"use client";

import SpinnerLoading from "@/components/shared/SpinnerLoading";
import { useAuth } from "@/context/AuthContext";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <SpinnerLoading width="v-8" height="h-8" />
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
