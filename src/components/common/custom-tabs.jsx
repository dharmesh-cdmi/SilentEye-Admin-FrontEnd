import { TabsList, TabsTrigger } from "../ui/tabs";

export default function CustomTabs({ tabs,setIsActive}) {
  return (
    <div className="w-full overflow-x-auto border rounded-t-lg ">
      <TabsList className="rounded-bl-none rounded-r-none">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="border-r " onClick={()=> setIsActive(tab.value)}>
            <tab.icon className="w-9 h-8 px-2" />
            {/* <img src={tab.icon} alt='icon' className="w-9 h-8 px-2" / */}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
