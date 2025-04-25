import api from "../axios";
import { TProjectPayload } from "../../../types/project.types";
import { Queries } from "../../../types/sheared.types";

const fetchProjects = async (queries?: Queries) => {
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

const fetchProjectById = async (id: string) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

const createProject = async (data: TProjectPayload) => {
  try {
    const response = await api.post("/projects", data);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

const updateProject = async (id: string, data: Partial<TProjectPayload>) => {
  try {
    const response = await api.patch(`/projects/${id}`, data);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

const deleteProject = async (id: string) => {
  try {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Object to encapsulate project-related services
export const projectServices = {
  fetchProjects,
  fetchProjectById,
  createProject,
  updateProject,
  deleteProject,
};
