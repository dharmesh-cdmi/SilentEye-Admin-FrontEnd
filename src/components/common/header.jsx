import { MoveLeft } from "lucide-react";
import CommonButton from "../ui/common-button";
import { cn } from "@/lib/utils";

export default function Header({ children, title, className }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-3 px-2 mb-5",
        className
      )}
    >
      <div className="flex justify-center items-center">
        <CommonButton>
          <MoveLeft />
        </CommonButton>
        <p className="lg:text-[20px] text-[16px] font-semibold px-2">{title}</p>
      </div>
      <div className="flex justify-center space-x-2">
        {children}
      </div>
      
    </div>
  );
}
