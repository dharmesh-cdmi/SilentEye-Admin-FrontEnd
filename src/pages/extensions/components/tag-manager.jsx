import React from "react";
import { TabularInput } from "@/components/ui/data-entry-comps";
import LabeledSwitch from "@/components/ui/labeled-switch";

const TagManager = ({ extDetails, state, onStateChange }) => {
  const { key, name, logo } = extDetails;

  return (
    <main className="rounded-xl border border-input">
      <LabeledSwitch
        logo={logo}
        name={name}
        checked={state.status === "enabled"}
        onCheckedChange={(e) =>
          onStateChange({ ...state, status: e ? "enabled" : "disabled" }, key)
        }
      />
      <TabularInput
        label="ID"
        value={state.id}
        placeholder="Enter your ID Here"
        onChange={(e) => onStateChange({ ...state, id: e.target.value }, key)}
      />
    </main>
  );
};

export default TagManager;
