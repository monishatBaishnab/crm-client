import { z } from "zod";
import { create_client_schema } from "./client.schemas";

// Client type
export type TClient = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};


// Payload type for creating or updating a client
export type TClientPayload = {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
};

export type TClientFormData = z.infer<typeof create_client_schema>;
