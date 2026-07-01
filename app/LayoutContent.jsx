"use client";

import Provider from "@/components/shared/Provider";
import SpinnerLoading from "@/components/shared/SpinnerLoading";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LayoutContent({ children }) {
  const { isLoading, user } = useAuth();
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith("/admin");

  if (isLoading && !isAdminRoute)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <SpinnerLoading width="v-8" height="h-8" />
      </div>
    );

  return (
    <>
      {!isAdminRoute && <Header />}
      <Provider>{children}</Provider>
      {!isAdminRoute && <Footer />}
    </>
  );
}
