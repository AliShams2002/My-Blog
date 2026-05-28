import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/context/AuthContext";
import PrivateRoute from "@/utils/PrivateRoute";

export default function AdminLayout({ children }) {
  return (
    <div className="">
      <AuthProvider>
        <PrivateRoute>{children}</PrivateRoute>
      </AuthProvider>
    </div>
  );
}
