import { useState } from "react";
import { Auth } from "@/api/endpoints";
import { EmailIcon, LoginIcon, PasswordIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Field, Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { signinValidationSchema } from "./signinValidation";
import toast from "react-hot-toast";
import usePost from "@/hooks/use-post";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "@/utils/localStorageUtils";

const credentialObj = {
  emailOrUsername: "",
  password: "",
  rememberMe: false,
};

const Login = () => {
  let navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  const { mutateAsync: signInMutation, isLoading: isSigninLoading } = usePost({
    isMultiPart: false,
    endpoint: Auth.Login,
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      emailOrUsername: values.emailOrUsername,
      password: values.password,
      rememberMe: values.rememberMe,
    };
    try {
      const response = await signInMutation(payload);
      if (response?.status === 200) {
        // Set the cookies with the tokens received from the response
        setAccessToken(response?.data?.data?.access_token);
        setRefreshToken(response?.data?.data?.refresh_token);
        toast.success(response?.data?.message || "Login Successfully !");
        queryClient.resetQueries();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <section className="min-w-96 w-2/4 flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Login to SilentEye</h1>
          <h3 className="text-gray-600">Welcome Back 👋</h3>
        </div>
        <Formik
          initialValues={credentialObj}
          validationSchema={signinValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, errors, touched, isSubmitting }) => (
            <Form className="w-full flex flex-col gap-3 [&>div>label]:text-sm [&>div>label]:font-semibold">
              <div>
                <label>Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0  flex items-center px-2">
                    <EmailIcon />
                  </div>

                  <Field
                    type="email"
                    name="emailOrUsername"
                    placeholder="Enter Your Mail ID"
                    className={`appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                      touched.emailOrUsername && errors.emailOrUsername
                        ? "border-red-500"
                        : ""
                    }`}
                    value={values.emailOrUsername}
                    onChange={handleChange}
                  />
                </div>

                {touched.emailOrUsername && errors.emailOrUsername && (
                  <p className="mt-2 text-sm text-red-600 ">
                    {errors.emailOrUsername}
                  </p>
                )}
              </div>
              <div>
                <label>Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0  flex items-center px-2">
                    <PasswordIcon />
                  </div>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Your Password"
                    className={`appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-1  ${
                      touched.password && errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                    value={values.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-2"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className="mr-2"
                  checked={values.rememberMe}
                  onChange={handleChange}
                />
                <label>Remember Me</label>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple text-base"
              >
                {isSigninLoading ? "Loading..." : "Login"}
                <LoginIcon className="ml-2" />
              </Button>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default Login;
