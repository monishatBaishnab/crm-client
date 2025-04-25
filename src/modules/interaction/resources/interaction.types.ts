import { z } from "zod";
import { create_interaction_schema } from "./interaction.schemas";

export type TInteraction = {
  id: string;
  project_id: string;
  client_id: string;
  user_id: string;
  type: "MEETING" | "CALL" | "EMAIL" | string; // extend as needed
  occurred_at: string; // ISO date string
  notes: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  client: {
    id: string;
    name: string;
    email: string;
  };
  project: {
    id: string;
    title: string;
  };
};

export type TInteractionPayload = {
  user_id: string;
  project_id: string;
  client_id: string;
  type: string;
  occurred_at: Date;
  notes: string;
};

export type TInteractionFormData = z.infer<typeof create_interaction_schema>;
