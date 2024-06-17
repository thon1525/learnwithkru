import * as Yup from "yup";

const TeacherSignup = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter an email"),
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters"),
});

export { TeacherSignup };

const becomeTeacher = Yup.object().shape({
  last_name: Yup.string()
    .required("lastname is a required field")
    .min(3, "lastname at least 3 characters long")
    .max(25, "lastname at least 25 "),
  first_name: Yup.string()
    .required("firstname is a required field")
    .min(3, "firstname at least 3 characters long")
    .max(25, "firstname at least 25 "),
  email: Yup.string().required().email(),
  phone_number: Yup.string()
    .min(8, "Phone number must be at least 8 characters")
    .max(10, "Phone number must be at most 10 characters"),
  province: Yup.string().required().min(3, "please select province"),
  subject: Yup.string().required().min(3, "please Select Subject "),
});

export { becomeTeacher };

const ProfilePhoto = Yup.object().shape({
  picture: Yup.string()
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

export { ProfilePhoto };

const teachersExperience = Yup.object().shape({
  university: Yup.string()
    .required()
    .min(3, "university at least 3 characters long")
    .max(70, "university at least 25"),
  year_experience: Yup.string()
    .required("Please select year")
    .min(1, "Please select type degree")
    .test(
      "is-not-zero",
      "Please select type degree",
      (value) => parseInt(value) !== 0
    ),
  type_degree: Yup.string()
    .required("Please select type degree")
    .min(3, "Please select type degree")
    .test("is-not-zero", "Please select type degree", (value) => value !== "0"),
  certificate: Yup.string()
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

export { teachersExperience };

const DescriptionTeachers = Yup.object().shape({
  bio: Yup.string()
    .required()
    .min(40, "Bio at least 40 characters long")
    .max(200, "Bio at least 200"),
  teaching_experience: Yup.string()
    .required()
    .min(25, "Teaching Experience at least 25 characters long")
    .max(200, "Teaching Experience most least 150"),
  motivation: Yup.string()
    .required()
    .min(40, "Motivate potential  at least 40 characters long ")
    .max(200, "Motivate potentialat least 150"),
  video: Yup.string()
    .test("file-size", "video size is too large", function (value) {
      const file =
        value && this.options.context && this.options.context.files
          ? this.options.context.files[value]
          : null;
      if (file && file.size) {
        return file.size <= 10 * 1024 * 1024; // 1MB limit
      }
      return true;
    })
    .required("Please upload an video"),
});

export { DescriptionTeachers };

const PriceTeachers = Yup.object().shape({
  price: Yup.number()
    .required("Please enter a price.")
    .test(
      "is-number",
      "Price must be a number.",
      (value) => !isNaN(Number(value))
    )
    .test("is-positive", "Please enter a price.", (value) => Number(value) >= 1)
    .test(
      "max-value",
      "Price should not exceed 990.",
      (value) => Number(value) <= 990
    ),
});

export { PriceTeachers };
