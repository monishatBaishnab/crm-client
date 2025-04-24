import { ReactNode } from "react";
import { Navigate } from "react-router";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();

  if (!token) {
    toast.error("You are not authorized.");
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
