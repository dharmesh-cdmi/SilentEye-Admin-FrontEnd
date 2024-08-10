import { cn } from "@/lib/utils";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { PROD_IMG_Prefix } from "@/api/endpoints";

export default function CustomTabs({
  tabs,
  setIsActive,
  className,
  setData,
}) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto custom-scrollbar border rounded-t-lg ",
        className
      )}
    >
      <TabsList className="rounded-bl-none rounded-r-none data-[state=active]:h-[48px]">
        {tabs?.map((tab, id) => (
          <TabsTrigger
            key={id}
            value={tab.value || tab._id}
            className="border-r flex justify-center items-center data-[state=active]:h-[48px]"
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
            <h3 className="text-[18px] px-1 font-medium">
              {tab.label || tab?.title}
            </h3>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
