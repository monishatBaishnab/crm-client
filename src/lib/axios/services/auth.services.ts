/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../axios";
import { LoginPayload, RegisterPayload } from "../../../types/auth.types";

const register = async (payload: RegisterPayload) => {
  try {
    const response = await api.post("/auth/register", payload);

    return response?.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const login = async (payload: LoginPayload) => {
  try {
    const response = await api.post("/auth/login", payload);

    return response?.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Fetch all clients with optional query parameters
const fetchStates = async () => {
  try {
    const response = await api.get("auth/states");
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Object to encapsulate product-related services
export const authServices = {
  login,
  register,
  fetchStates,
};
