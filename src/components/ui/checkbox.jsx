"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "@/lib/utils"
import { CheckIcon } from "@/assets/icons"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-md border text-center  border-gray-300 ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-100 data-[state=checked]:border-green-500  data-[state=checked]:text-green-500",
      className
    )}
    {...props}>
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <CheckIcon size={10} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
