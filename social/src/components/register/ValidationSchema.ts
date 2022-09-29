import * as yup from "yup";

// Yup validations
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const validationSchema = yup.object({
  userName: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .required("username is required"),
  firstName: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .required("first name is required"),
  lastName: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .required("last name is required"),
  email: yup.string().email("Please enter a valid email").required(),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, "Please enter a strong password")
    .required(),
});
