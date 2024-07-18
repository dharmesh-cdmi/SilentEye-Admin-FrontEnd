import { cn } from "@/lib/utils";
import { TabsList, TabsTrigger } from "../ui/tabs";

export default function CustomTabs({ tabs, className = "" }) {
  return (
    <div
      className={cn("w-full overflow-x-auto border rounded-t-lg", className)}
    >
      <TabsList className="">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="border-r ">
            <tab.icon className="w-9 h-8 px-2" />
            {/* <img src={tab.icon} alt='icon' className="w-9 h-8 px-2" / */}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
