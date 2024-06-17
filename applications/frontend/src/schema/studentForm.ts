import * as yup from "yup";

const studentSchema = yup.object().shape({
  school_name: yup
    .string()
    .required("School name is required")
    .min(3, "School name must be at least 3 characters long")
    .max(50, "School name cannot exceed 50 characters"),
  education: yup.string().required("Education level is required"),
  grade: yup.string().required("Grade is required"),
  student_card: yup
    .mixed()
    .notRequired() // Make student_card not required
    .test("File is too large", "File is too large or invalid type", (value) => {
      if (!value) return true; // Allow undefined/null values

      // Handle file type validation
      if (value && !/\.(jpg|jpeg|png|pdf)$/i.test((value as File).name)) {
        return false;
      }

      // Validate for size (less than 3MB)
      return (value as File).size <= 3 * 1024 * 1024;
    }),
});

export { studentSchema };
