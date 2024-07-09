import React, { useState } from "react";
import { Input } from "../ui/input";
import { LoginIcon, ChangePassIcon } from "@/assets/icons";
import { Button } from "../ui/button";

const passwordObj = {
  currentPass: "",
  newPass: "",
  confirmNewPass: "",
};

const ChangePass = () => {
  const [passwords, setPasswords] = useState(passwordObj);

  const handleChangePass = () => {};

  return (
    <main>
      <h1 className="flex gap-2 mb-5 text-2xl">
        <ChangePassIcon /> Change Password
      </h1>
      <form
        onSubmit={handleChangePass}
        className="w-full flex flex-col gap-5 [&>div>label]:text-base [&>div>label]:font-semibold"
      >
        <div>
          <label>Current Password</label>
          <Input
            type="password"
            placeholder="Enter Your Current Password"
            required={true}
            value={passwords.currentPass}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPass: e.target.value })
            }
          />
        </div>
        <div>
          <label>New Password</label>
          <Input
            type="password"
            placeholder="Enter Your New Password"
            required={true}
            value={passwords.newPass}
            onChange={(e) =>
              setPasswords({ ...passwords, newPass: e.target.value })
            }
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <Input
            type="password"
            placeholder="Enter Your Confirm New Password"
            required={true}
            value={passwords.confirmNewPass}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmNewPass: e.target.value })
            }
          />
        </div>
        <Button className="bg-purple text-base">
          Change Password
          <LoginIcon className="ml-2" />
        </Button>
      </form>
    </main>
  );
};

export default ChangePass;
