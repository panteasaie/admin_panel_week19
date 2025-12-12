import * as yup from "yup";
export const registrationSchema = yup.object({
  username: yup.string().required("Username  is required"),
 
  password: yup
    .string()
    .min(6, "Password must be at least 6 charecters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});
