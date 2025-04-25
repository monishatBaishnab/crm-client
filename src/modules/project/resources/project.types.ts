import { z } from "zod";
import { create_project_schema } from "./project.schemas";

export type TProjectStatus =
  | "IN_PROGRESS"
  | "ON_HOLD"
  | "COMPLETED"
  | "CANCELED";

type Client = {
  id: string;
  name: string;
  email: string;
};

export type TProject = {
  id: string;
  client_id: string;
  title: string;
  budget: string;
  deadline: string;
  status: TProjectStatus;
  description: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  client: Client;
};

export type TProjectPayload = {
  client_id: string;
  title: string;
  budget: number | string;
  deadline: string;
  status: string;
  description: string;
};

export type TProjectFormData = z.infer<typeof create_project_schema>;
