import { z } from "zod";

/* Schema used when adding a new project                    */
export const create_project_schema = z.object({
  client_id: z.string({ required_error: "Client ID is required." }),
  title: z.string({ required_error: "Project title is required." }),
  budget: z.string({ required_error: "Budget is required." }),
  deadline: z.coerce
    .date({ required_error: "Deadline is required." })
    .min(new Date(), { message: "Deadline must be in the future." }),
  status: z.string({
    required_error: "Status is required.",
  }),
  description: z.string().optional().nullable(),
});
