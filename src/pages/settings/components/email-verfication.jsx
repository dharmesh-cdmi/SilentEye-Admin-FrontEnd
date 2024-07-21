import React from "react";
import LabeledSwitch from "@/components/ui/labeled-switch";
import { EmailVerificationIcon } from "@/assets/icons";

const EmailVerification = ({ emailVerification, setEmailVerification }) => {
  return (
    <section className="rounded-xl border border-input">
      <LabeledSwitch
        logo={<EmailVerificationIcon />}
        name="Email Verification"
        checked={emailVerification.status === "enabled"}
        onCheckedChange={(e) =>
          setEmailVerification({ status: e ? "enabled" : "disabled" })
        }
      />
    </section>
  );
};

export default EmailVerification;
