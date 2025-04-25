import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = Record<string, unknown>;

const useAuth = () => {
  const token = localStorage.getItem("token");

  /** Decoded payload, or null if token missing / malformed */
  const decoded = useMemo<JwtPayload | null>(() => {
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }, [token]);

  return { token, decoded };
};

export default useAuth;
