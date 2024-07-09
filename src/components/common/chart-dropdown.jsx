import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function ChartDropdown({
  selectedChartList,
  setSelectedChartList,
  data,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (label) => {
    setSelectedChartList((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleSelectAllChange = (checked) => {
    if (checked) {
      setSelectedChartList(data.map((dataset) => dataset.label));
    } else {
      setSelectedChartList([]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "cursor-pointer  flex justify-center px-4 items-center space-x-2"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-[16px] font-medium">Show</p>
          {isOpen ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-[320px] mr-10">
        <div className=" ">
          <div className="border-b">
            <div className="px-4 flex justify-start items-center space-x-2 py-2 ">
              <Checkbox
                checked={selectedChartList?.length === data?.length }
                onCheckedChange={handleSelectAllChange}
                className={cn(
                    " h-5 w-5 rounded-lg",
                    selectedChartList?.length === data?.length
                      ? "bg-green-200 text-green-500 border border-green-500"
                      : "bg-white border border-gray-300"
                  )}
              />
              <span className="text-sm font-normal">All</span>
            </div>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {data?.map((dataset) => (
              <div
                key={dataset.label}
                className="flex items-center space-x-2 border-b "
              >
                <div className="px-4 py-2 flex items-center justify-start ">
                  <Checkbox
                    checked={selectedChartList?.includes(dataset.label)}
                    onCheckedChange={() => handleCheckboxChange(dataset.label)}
                    className={cn(
                        " h-5 w-5 rounded-lg",
                        selectedChartList?.includes(dataset.label)
                          ? "bg-green-200 text-green-500 border border-green-500"
                          : "bg-white border border-gray-300"
                      )}
                  />
                  <span className="text-sm font-normal px-2">
                    {dataset.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
