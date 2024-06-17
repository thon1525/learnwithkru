import { z } from "zod"

export const StudentSchemas = z.object({
  school_name: z.string().min(2).max(50),
  education: z.string().min(2).max(50),
  grade: z.number(),
  student_card: z.string()
});