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

// Object to encapsulate product-related services
export const authServices = {
  login,
  register,
};
