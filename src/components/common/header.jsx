import { MoveLeft } from "lucide-react";
import CommonButton from "../ui/common-button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ children, title, className }) {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 960 : false
  );
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 960);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={cn(
        isSmallScreen ? "flex flex-col gap-4" : "flex  items-center justify-between py-3 px-2 mb-5",
        className
      )}
    >
      <div className="flex justify-start items-center">
        <CommonButton onClick={()=> navigate(-1)}>
          <MoveLeft />
        </CommonButton>
        <p className="lg:text-[20px] text-[16px] font-semibold px-2">{title}</p>
      </div>
      <div className={cn(isSmallScreen ? "flex flex-col gap-3 mb-5" : "flex justify-center space-x-2")}>
        {children}
      </div>
      
    </div>
  );
}
