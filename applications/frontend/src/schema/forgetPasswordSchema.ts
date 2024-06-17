import * as Yup from "yup";
const ComfirmPassword = Yup.object().shape({
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must characters number special character"
    ),
  re_password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must characters number special character"
    ),
});

export { ComfirmPassword };
