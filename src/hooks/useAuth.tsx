// hooks/useAuth.ts
import { useMemo } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type JwtPayload = Record<string, unknown>;

const useAuth = () => {
  /** Raw JWT from cookie, or undefined if not present */
  const token = Cookies.get("token");
  console.log(token);
  /** Decoded payload, or null if token missing / malformed */
  const decoded = useMemo<JwtPayload | null>(() => {
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null; // token might be expired / tampered with
    }
  }, [token]);

  return { token, decoded };
};

export default useAuth;
