import React from "react";
import { TabularInput } from "./data-entry-comps";
import LabeledSwitch from "./labeled-switch";

const ExtensionBox = ({ extDetails, state, onStateChange }) => {
  const { name, logo } = extDetails;

  return (
    <main className="rounded-xl border border-input">
      <LabeledSwitch
        logo={logo}
        name={name}
        checked={state.enable}
        onCheckedChange={(e) => onStateChange({ ...state, enable: e })}
      />
      <TabularInput
        label="Key"
        value={state.key}
        placeholder="Enter your Key Here"
        onChange={(e) => onStateChange({ ...state, key: e.target.value })}
      />
      <TabularInput
        label="Secret Key"
        value={state.secretKey}
        placeholder="Enter your Secret Key Here"
        onChange={(e) => onStateChange({ ...state, secretKey: e.target.value })}
      />
    </main>
  );
};

export default ExtensionBox;
