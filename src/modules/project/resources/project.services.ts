import api from "../../../lib/axios/axios";
import { Queries } from "../../../types/sheared.types";
import { TProjectPayload } from "..";

// Fetch all projects with optional query parameters
export const fetchProjects = async (queries?: Queries) => {
  try {
    const params = new URLSearchParams();
    if (queries?.length) {
      queries.forEach((query) => params.append(query.name, query.value));
    }

    const response = await api.get("/projects", { params });
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Fetch a project by their user_id
export const fetchProjectById = async (id: string) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Create a new project
export const createProject = async (data: TProjectPayload) => {
  try {
    const response = await api.post("/projects", data);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Update an existing project by user_id
export const updateProject = async (
  id: string,
  data: Partial<TProjectPayload>,
) => {
  try {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Delete a project by user_id
export const deleteProject = async (id: string) => {
  try {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};
