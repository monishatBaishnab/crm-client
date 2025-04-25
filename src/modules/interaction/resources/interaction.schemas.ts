import { z } from "zod";

/* Schema used when adding a new project                    */
export const create_interaction_schema = z.object({
  project_id: z.string({ required_error: "Project ID is required." }),
  client_id: z.string({ required_error: "Client ID is required." }),
  type: z.string({
    required_error: "Interaction type is required.",
  }).min(1),
  occurred_at: z.coerce
    .date({ required_error: "Occurred‑at date is required." })
    .max(new Date(), { message: "Occurred‑at cannot be in the future." }),
  notes: z.string().optional().nullable(),
});
