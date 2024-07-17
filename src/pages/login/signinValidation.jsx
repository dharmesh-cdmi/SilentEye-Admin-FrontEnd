import * as Yup from "yup";

export const signinValidationSchema = Yup.object().shape({
    emailOrUsername: Yup.string().email("Invalid email address").required("Mail Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password Required"),
  });