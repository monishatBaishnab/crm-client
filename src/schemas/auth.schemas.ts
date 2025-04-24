import { z } from "zod";

const register = z.object({
  name: z.string({ required_error: "Name is required." }),
  email: z.string({ message: "Email is required." }),
  password: z.string({ required_error: "Password is required" }),
});

const login = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string({ required_error: "Password is required" }),
});

export const authSchemas = { register, login };
