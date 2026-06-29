import "../globals.css";
import { AuthProvider } from "@/context/AuthContext";
import LayoutContent from "./LayoutContent";
import PrivateRoute from "@/utils/PrivateRoute";

export default function AdminLayout({ children }) {
  return (
    <div className="">
      <AuthProvider>
        <PrivateRoute>
          <LayoutContent>{children}</LayoutContent>
        </PrivateRoute>
      </AuthProvider>
    </div>
  );
}
