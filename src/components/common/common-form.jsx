import { cn } from "@/lib/utils";

const InputField = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col   divide-y-[1.5px]  overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

export default InputField;
