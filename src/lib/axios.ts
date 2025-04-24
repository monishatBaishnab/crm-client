import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api/v1",
  withCredentials: true,
});

import { AxiosHeaders } from "axios";

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers = {
      ...(config.headers as AxiosHeaders).toJSON(),
      Authorization: `${token}`,
    } as unknown as AxiosHeaders;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return error?.response;
  },
);

export default api;
