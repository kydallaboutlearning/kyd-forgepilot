
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useLocation, Navigate } from "react-router-dom";

// Wrap Dashboard and any admin-only pages in this
export default function RequireAdminAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();
  if (loading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
