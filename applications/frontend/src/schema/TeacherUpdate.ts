
import * as Yup from "yup";
const TeacherUpdate = Yup.object().shape({
    last_name: Yup.string()
      .required("lastname is a required field")
      .min(3, "lastname at least 3 characters long")
      .max(25, "lastname at least 25 "),
    first_name: Yup.string()
      .required("firstname is a required field")
      .min(3, "firstname at least 3 characters long")
      .max(25, "firstname at least 25 "),
    phone_number: Yup.string()
      .min(8, "Phone number must be at least 8 characters")
      .max(10, "Phone number must be at most 10 characters"),
    province: Yup.string().required().min(3, "please select province"),
    subject: Yup.string().required().min(3, "please Select Subject "),
  });

  export { TeacherUpdate };




  export interface AboutTeacher {
    first_name: string;
    last_name: string;
    subject: string;
    phone_number: string;
    province: string;
  }
  