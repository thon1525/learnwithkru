import { z } from "zod";

export const teacherSchemas = z.object({
  first_name: z.string().min(2).max(25),
  last_name: z.string().min(2).max(25),
  picture: z.string(),
  email: z.string().email(),
  phone_number: z.string().min(8).max(10),
  subject: z.string(),
  province: z.string(),
  university: z.string().optional(),
  year_experience: z.number().optional(),
  type_degree: z.string().optional(),
  certificate: z.string().optional(),
  bio: z.string().min(40).max(200),
  motivation: z.string().min(25).max(200),
  date_available: z.array(
    z.object({
      day: z.string(),
      time: z.array(
        z.object({
          start: z.string().optional(),
          end: z.string().optional(),
        })
      ),
    })
  ),
  price: z.number(),
  video: z.string(),
  teaching_experience: z.string().min(25).max(150),
});

export const updateTeacherSchemas = z.object({
  first_name: z.string().min(2).max(25).optional(),
  last_name: z.string().min(2).max(25).optional(),
  picture: z.string().optional(),
  phone_number: z.string().min(8).max(10).optional(),
  subject: z.string().optional(),
  province: z.string().optional(),
  university: z.string().optional(),
  year_experience: z.number().optional(),
  type_degree: z.string().optional(),
  bio: z.string().min(40).max(200).optional(),
  motivation: z.string().min(25).max(200).optional(),
  date_available: z
    .array(
      z
        .object({
          day: z.string().optional(),
          time: z
            .array(
              z
                .object({
                  start: z.string().optional(),
                  end: z.string().optional(),
                })
                .optional()
            )
            .optional(),
        })
        .optional()
    )
    .optional(),
  price: z.number().optional(),
  certificate: z.string().optional(),
  video: z.string().optional(),
  teaching_experience: z.string().min(25).max(150).optional(),
});
