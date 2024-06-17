import * as Yup from "yup"; // Import Yup library

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "Username should be at least 3 characters long")
    .max(25, "Username should not exceed 25 characters"),

  lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Username should be at least 3 characters long")
    .max(25, "Username should not exceed 25 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
export const validationTeacher = Yup.object().shape({
  Firstname: Yup.string()
    .required("First name is required")
    .min(3, "Username should be at least 3 characters long")
    .max(25, "Username should not exceed 25 characters"),

  Lastname: Yup.string()
    .required("Last name is required")
    .min(3, "Username should be at least 3 characters long")
    .max(25, "Username should not exceed 25 characters"),
  Email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  Password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  Address: Yup.string().required("Address is required"),
  PhoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
  bio: Yup.string().required("Bio is required"),
  pictureTeacher: Yup.string()
    .test("file-size", "Image size is too large", function (value) {
      const file =
        value && this.options.context && this.options.context.files
          ? this.options.context.files[value]
          : null;
      if (file && file.size) {
        return file.size <= 1024 * 1024; // 1MB limit
      }
      return true;
    })
    .required("Please upload an image"),
});
