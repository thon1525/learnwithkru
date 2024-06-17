import * as Yup from "yup";

const createClassSchema = Yup.object().shape({
  class_name: Yup.string()
    .required("Classroom is required")
    .min(3, "Classroom should be at least 3 characters long"),
  subject: Yup.string()
    .required("Subject is required")
    .min(3, "Subject should be at least 3 characters long"),
    email: Yup.array().of(
    Yup.string().email("Invalid email address").required("Email is required")
  ),
});

export { createClassSchema };
