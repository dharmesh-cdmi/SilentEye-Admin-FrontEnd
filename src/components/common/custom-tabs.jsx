import { TabsList, TabsTrigger } from "../ui/tabs";

export default function CustomTabs({ tabs,setIsActive}) {
  return (
    <div className="w-full overflow-x-auto border rounded-t-lg ">
      <TabsList className="rounded-bl-none rounded-r-none">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="border-r " onClick={()=> setIsActive(tab.value)}>
            {
              tab.icon && <tab.icon className="w-9 h-8 px-2" />
            }
            <h3 className="text-[18px] px-1 font-medium">
              {tab.label}
            </h3>
            
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
