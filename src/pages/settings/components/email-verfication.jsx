import React from "react";
import LabeledSwitch from "@/components/ui/labeled-switch";
import { EmailVerificationIcon } from "@/assets/icons";

const EmailVerification = ({ emailVerification, setEmailVerification }) => {
  return (
    <section className="rounded-xl border border-input">
      <LabeledSwitch
        logo={<EmailVerificationIcon />}
        name="Email Verification"
        checked={emailVerification}
        onCheckedChange={(e) => setEmailVerification(e)}
      />
    </section>
  );
};

export default EmailVerification;
