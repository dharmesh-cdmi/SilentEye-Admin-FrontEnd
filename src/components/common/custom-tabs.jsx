import { TabsList, TabsTrigger } from "../ui/tabs";

export default function CustomTabs({ tabs }) {
  return (
    <div className="w-full overflow-x-auto border rounded-t-lg">
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
