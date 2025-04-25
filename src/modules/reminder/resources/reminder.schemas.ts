import { z } from "zod";

export const create_reminder_schema = z.object({
  client_id: z.string().optional().nullable(),
  project_id: z.string().optional().nullable(),
  title: z.string({ required_error: "Title is required" }),
  due_at: z.coerce
    .date({ required_error: "Due at is required." })
    .min(new Date(), { message: "Due at must be in the future." }),
});
