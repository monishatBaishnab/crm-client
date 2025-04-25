import api from "../../../lib/axios/axios";
import { Queries } from "../../../types/sheared.types";
import { TInteractionPayload } from "..";

// Fetch all interactions with optional query parameters
export const fetchInteractions = async (queries?: Queries) => {
  try {
    const params = new URLSearchParams();
    if (queries?.length) {
      queries.forEach((query) => params.append(query.name, query.value));
    }

    const response = await api.get("/interactions", { params });
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Fetch an interaction by its ID
export const fetchInteractionById = async (id: string) => {
  try {
    const response = await api.get(`/interactions/${id}`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Create a new interaction
export const createInteraction = async (data: TInteractionPayload) => {
  try {
    const response = await api.post("/interactions", data);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Update an existing interaction by ID
export const updateInteraction = async (
  id: string,
  data: Partial<TInteractionPayload>,
) => {
  try {
    const response = await api.put(`/interactions/${id}`, data);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Delete an interaction by ID
export const deleteInteraction = async (id: string) => {
  try {
    const response = await api.delete(`/interactions/${id}`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};
