import { EmailIcon, LoginIcon, PasswordIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const credentialObj = {
  email: "",
  password: "",
  rememberMe: false,
};

const Login = () => {
  const [credentials, setCredentials] = useState(credentialObj);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("submi");

    try {
    } catch (error) {}
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <section className="min-w-96 w-2/4 flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Login to SilentEye</h1>
          <h3 className="text-gray-600">Welcome Back 👋</h3>
        </div>
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col gap-3 [&>div>label]:text-sm [&>div>label]:font-semibold"
        >
          <div>
            <label>Email</label>
            <Input
              type="email"
              icon={<EmailIcon />}
              placeholder="Enter Your Mail ID"
              required={true}
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              type="password"
              icon={<PasswordIcon />}
              placeholder="Enter Your Password"
              required={true}
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              value={credentials.rememberMe}
              onChange={() =>
                setCredentials({
                  ...credentials,
                  rememberMe: !credentials.rememberMe,
                })
              }
            />
            <label className="ml-2">Remember Me</label>
          </div>
          <Button className="bg-purple text-base">
            Login
            <LoginIcon className="ml-2" />
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Login;
