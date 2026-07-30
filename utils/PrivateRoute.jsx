"use client";

import SpinnerLoading from "@/components/shared/SpinnerLoading";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading spinner while checking authentication status
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
