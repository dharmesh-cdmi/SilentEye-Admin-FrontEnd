import React from "react";
import { Switch } from "./switch";
import { cn } from "@/lib/utils";

const LabeledSwitch = ({ logo, name, switchBoxClass = "", ...props }) => {
  return (
    <section
      className={cn("flex items-center gap-3 px-4 py-2", switchBoxClass)}
    >
      {logo}
      <h2 className="text-lg font-medium">{name}</h2>
      <Switch className="data-[state=checked]:bg-[#34C759]" {...props} />
    </section>
  );
};

export default LabeledSwitch;
