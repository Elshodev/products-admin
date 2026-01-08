import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Loader from "@/components/Loader";

export default function ProtectedRoute() {
  const { token, logout } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!token) throw new Error("Token yo'q");
        setIsAuthorized(true);
      } catch (err) {
        logout();
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [token, logout]);

  if (isLoading) return <Loader isFullScreen />;

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
