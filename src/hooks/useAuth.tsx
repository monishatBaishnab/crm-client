import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

type TUser = {
  id: string; 
  email: string; 
  name: string; 
  password: string; 
  theme_pref: string | null; 
  is_deleted: boolean; 
  created_at: string; 
  updated_at: string; 
  iat: number; 
  exp: number; 
};

const useAuth = () => {
  const token = localStorage.getItem("token");

  /** Decoded payload, or null if token missing / malformed */
  const decoded = useMemo<TUser | null>(() => {
    if (!token) return null;
    try {
      return jwtDecode<TUser>(token);
    } catch {
      return null;
    }
  }, [token]);
  
  return { token, user: decoded };
};

export default useAuth;
