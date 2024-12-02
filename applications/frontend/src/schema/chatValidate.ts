import * as Yup from "yup";

const ChatMessages = Yup.object().shape({
    message: Yup.string()
    .required("lastname is a required field")
    .min(3, "lastname at least 3 characters long")
});

export { ChatMessages}