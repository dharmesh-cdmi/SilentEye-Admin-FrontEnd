import React from "react";
import { Input } from "./input";
import { cn, isNotNullOrEmpty } from "@/lib/utils";

const LabeledInput = ({ label, required = true, ...props }) => {
  const placeholder = isNotNullOrEmpty(props.placeholder)
    ? props.placeholder
    : "Enter Your " + label;

  return (
    <div>
      <label className="text-base font-semibold">{label}</label>
      <Input placeholder={placeholder} required={required} {...props} />
    </div>
  );
};

const TabularInput = ({ label, required = true, ...props }) => {
  const inputFieldClass = "rounded-none rounded-br-xl outline-none font-medium";
  const inputBoxClass = cn("border-b-0 border-r-0", inputFieldClass);
  const placeholder = isNotNullOrEmpty(props.placeholder)
    ? props.placeholder
    : "Enter " + label;

  return (
    <section className="flex">
      <div className="text-muted-foreground h-10 border-t w-[115px] [&>h3]:text-[15px] px-3.5 py-2 font-medium">
        <h3>{label}</h3>
      </div>
      <Input
        inputBoxClass={cn(inputBoxClass, props.inputBoxClass)}
        className={cn(inputFieldClass, props.inputFieldClass)}
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </section>
  );
};

export { LabeledInput, TabularInput };
