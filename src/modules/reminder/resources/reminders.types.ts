import { z } from "zod";
import { create_reminder_schema } from "./reminder.schemas";

// Reminder base type
export type TReminder = {
  id: string;
  user_id: string;
  client_id: string;
  title: string;
  due_at: string;
  is_completed: boolean;
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

// Reminder creation payload
export type TReminderPayload = {
  user_id: string;
  client_id: string | null;
  project_id: string | null;
  title: string;
  due_at: string;
  is_completed: boolean;
};

// Reminder form data (Zod-inferred)
export type TReminderFormData = z.infer<typeof create_reminder_schema>;
