import React, { useState } from "react";
import { LoginIcon, ChangePassIcon } from "@/assets/icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { LabeledInput } from "../ui/data-entry-comps";
import axios from "axios";
import { ADMIN_BASE_URL } from "@/api/adminAPI";
import { getApiHeaders, handleApiError } from "@/lib/utils";

const passwordObj = {
  currentPass: "",
  newPass: "",
  confirmNewPass: "",
};

const ChangePassDialog = ({ openDialog, setOpenDialog }) => {
  const [passwords, setPasswords] = useState(passwordObj);

  const closeDialog = () => {
    setPasswords(passwordObj);
    setOpenDialog(!openDialog);
  };

  const handleChangePass = async (e) => {
    e.preventDefault();

    const { currentPass, newPass, confirmNewPass } = passwords;
    if (newPass !== confirmNewPass) {
      return alert("New Password and Confirm Password doesn't match");
    }

    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/admin/change-password`,
        {
          oldPassword: currentPass,
          newPassword: newPass,
        },
        getApiHeaders()
      );

      if (response.data.success) {
        alert(response.data.message);
        closeDialog();
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogTitle className="flex items-center gap-1.5 text-xl">
          <ChangePassIcon size={30} /> Change Password
        </DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <form
          onSubmit={handleChangePass}
          className="w-full flex flex-col gap-5 mt-3"
        >
          <LabeledInput
            type="password"
            // minLength="8"
            label="Current Password"
            value={passwords.currentPass}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPass: e.target.value })
            }
          />
          <LabeledInput
            type="password"
            minLength="8"
            label="New Password"
            value={passwords.newPass}
            onChange={(e) =>
              setPasswords({ ...passwords, newPass: e.target.value })
            }
          />
          <LabeledInput
            type="password"
            minLength="8"
            label="Confirm New Password"
            value={passwords.confirmNewPass}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmNewPass: e.target.value })
            }
          />
          <Button className="bg-purple text-base">
            Change Password
            <LoginIcon className="ml-2" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassDialog;
