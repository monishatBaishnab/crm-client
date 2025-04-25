import { z } from "zod";

// Zod schema for client data validation
export const create_client_schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  company: z.string().min(1, "Company is required"),
});
