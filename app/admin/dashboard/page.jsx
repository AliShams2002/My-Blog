"use client";

import { useAuth } from "@/context/AuthContext";
import React from "react";

const Page = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button className="p-3 bg-blue-500 rounded-md" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Page;
