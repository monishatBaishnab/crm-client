import axios, { AxiosError, AxiosResponse } from "axios";
import { AxiosHeaders } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
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
