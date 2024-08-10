import { cn } from "@/lib/utils";
export default function CommonButton({children,className , onClick}) {
  return (
    <div  className={cn("h-10 cursor-pointer flex justify-center items-center rounded-md px-3 mb-1 hover:bg-accent hover:text-accent-foreground border-gray-100 border-2",className)}
    onClick={onClick}>
      {/* <icon className="w-7 h-7 p-1 text-primary" /> */}
      {children}
    </div>
  );
}
