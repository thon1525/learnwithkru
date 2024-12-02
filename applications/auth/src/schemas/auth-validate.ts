import { z } from "zod";
const userValidateSchema = z.object({
  first_name: z.string().min(3).max(25),
  last_name: z.string().min(3).max(25),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*\d)(?=.*[a-z]).{8,}$/,
      "Password must contain at least one lowercase letter and one number"
    ),
});

export { userValidateSchema };

const authLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*\d)(?=.*[a-z]).{8,}$/,
      "Password must contain at least one lowercase letter and one number"
    ),
});

export { authLoginSchema };
