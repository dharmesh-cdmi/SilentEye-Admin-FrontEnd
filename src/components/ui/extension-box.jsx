import React from "react";
import { TabularInput } from "./data-entry-comps";
import LabeledSwitch from "./labeled-switch";

const ExtensionBox = ({ extDetails, state, onStateChange }) => {
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
        label="Key"
        value={state.key}
        placeholder="Enter your Key Here"
        onChange={(e) => onStateChange({ ...state, key: e.target.value }, key)}
      />
      <TabularInput
        label="Secret Key"
        value={state.secretKey}
        placeholder="Enter your Secret Key Here"
        onChange={(e) =>
          onStateChange({ ...state, secretKey: e.target.value }, key)
        }
      />
    </main>
  );
};

export default ExtensionBox;
