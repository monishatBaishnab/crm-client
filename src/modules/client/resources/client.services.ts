import api from "../../../lib/axios/axios";
import { Queries } from "../../../types/sheared.types";
import { TClientPayload } from "..";

// Fetch all clients with optional query parameters
export const fetchClients = async (queries?: Queries) => {
  try {
    const params = new URLSearchParams();
    if (queries?.length) {
      queries.forEach((query) => params.append(query.name, query.value));
    }

    const response = await api.get("/clients", { params });
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Fetch a client by their user_id
export const fetchClientById = async (id: string) => {
  try {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Create a new client
export const createClient = async (data: TClientPayload) => {
  try {
    const response = await api.post("/clients", data);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Update an existing client by user_id
export const updateClient = async (
  id: string,
  data: Partial<TClientPayload>,
) => {
  try {
    const response = await api.put(`/clients/${id}`, data);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Delete a client by user_id
export const deleteClient = async (id: string) => {
  try {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};
