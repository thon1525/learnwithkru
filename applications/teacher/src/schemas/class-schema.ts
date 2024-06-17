import { z } from "zod";

export const classSchema = z.object({
  school_name: z.string().min(2).max(35),
  subject: z.string().min(2).max(25),
  email: z.string().email(),
});
