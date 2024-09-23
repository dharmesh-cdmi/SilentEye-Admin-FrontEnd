import { cn } from "@/lib/utils";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { PROD_IMG_Prefix } from "@/api/endpoints";

export default function CustomTabs({ tabs, setIsActive, className, setData }) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto custom-scrollbar border border-b-0 rounded-t-lg ",
        className
      )}
    >
      <TabsList className="rounded-bl-none rounded-r-none data-[state=active]:h-[48px]">
        {tabs?.map((tab, index) => (
          <TabsTrigger
            key={index}
            value={tab.value || tab._id}
            className="border-r flex justify-center items-center data-[state=active]:h-[48px] text-primary hover:bg-primary hover:text-white data-[state=active]:text-white"
            onClick={async () => {
              if (setData) {
                await setData(null);
              }
              await setIsActive(tab.value || tab._id);
            }}
          >
            {tab.icon && <tab.icon className="w-9 h-9 p-1" />}
            {tab.image && (
              <img
                src={PROD_IMG_Prefix + tab?.image}
                alt="icon"
                className="w-6 h-6 rounded-full  flex justify-center items-center "
              />
            )}
            <h3 className="text-[18px] px-1 font-normal">
              {tab.label || tab?.title}
            </h3>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
