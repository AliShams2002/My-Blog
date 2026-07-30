import "../globals.css";
import { AuthProvider } from "@/context/AuthContext";
import LayoutContent from "./LayoutContent";
import PrivateRoute from "@/utils/PrivateRoute";

export default function AdminLayout({ children }) {
  return (
    <div className="font-iransans-edit">
      {/* Wrap the entire admin layout with authentication context */}
      <AuthProvider>
        {/* Protect all admin routes - redirect to login if not authenticated */}
        <PrivateRoute>
          <LayoutContent>{children}</LayoutContent>
        </PrivateRoute>
      </AuthProvider>
    </div>
  );
}
