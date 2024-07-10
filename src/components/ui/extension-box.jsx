import React from "react";
import { Switch } from "./switch";
import { Input } from "./input";
import { cn } from "@/lib/utils";

const ExtensionBox = ({ extDetails, state, onStateChange }) => {
  const { name, logo } = extDetails;

  const innerDivStyles =
    "text-muted-foreground h-10 border-t w-[106px] [&>h3]:text-[15px] px-3.5 py-2 font-medium";

  const inputFieldClass = "rounded-none rounded-br-xl outline-none";
  const inputBoxClass = cn("border-b-0 border-r-0", inputFieldClass);

  return (
    <main className="rounded-xl border border-input [&>section]:flex">
      <section className="items-center gap-3 px-4 py-2">
        {logo}
        <h2 className="text-lg font-medium">{name}</h2>
        <Switch
          defaultChecked={state.enable}
          className="data-[state=checked]:bg-[#34C759]"
          onCheckedChange={() =>
            onStateChange({ ...state, enable: !state.enable })
          }
        />
      </section>
      <section>
        <div className={innerDivStyles}>
          <h3>Key</h3>
        </div>
        <Input
          inputBoxClass={inputBoxClass}
          className={inputFieldClass}
          value={state.key}
          placeholder="Enter your Key Here"
          onChange={(e) => onStateChange({ ...state, key: e.target.value })}
        />
      </section>
      <section>
        <div className={innerDivStyles}>
          <h3>Secret Key</h3>
        </div>
        <Input
          inputBoxClass={inputBoxClass}
          className={inputFieldClass}
          value={state.secretKey}
          placeholder="Enter your Secret Key Here"
          onChange={(e) =>
            onStateChange({ ...state, secretKey: e.target.value })
          }
        />
      </section>
    </main>
  );
};

export default ExtensionBox;
