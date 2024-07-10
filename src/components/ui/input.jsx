import * as React from "react";
import { isNotNullOrEmpty } from "@/lib/utils";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, inputBoxClass, type = "text", ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center w-full rounded-md border border-input bg-background ring-offset-background has-[:focus]:outline has-[:focus]:outline-2",
          inputBoxClass
        )}
      >
        {isNotNullOrEmpty(props.icon) && (
          <div className="ml-2">{props.icon}</div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md bg-background px-3 py-2 text-[15px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:font-medium outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
