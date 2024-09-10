import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; // Make sure these are correctly imported
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";

export default function ItemSelector({
  items,
  selectedItems,
  setSelectedItems,
  label = "Items",
}) {
  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAllChange = (checked) => {
    if (checked) {
      setSelectedItems(items.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="flex justify-between items-center hover:no-underline py-3 px-4 font-semibold">
          <p className="w-full text-left">{label}</p>
          <RefreshCcw size={20} className="mr-4" onClick={()=> setSelectedItems([])}/>
        </AccordionTrigger>
        <AccordionContent className="py-0">
          <div className="max-h-80 flex flex-col divide-y overflow-y-auto border-t">
            <div className="flex justify-start items-center gap-2 px-4 py-2.5">
              <Checkbox
                checked={selectedItems?.length === items.length}
                onCheckedChange={handleSelectAllChange}
                className={cn(
                  "form-checkbox h-5 w-5 rounded-lg",
                  selectedItems?.length === items.length
                    ? "bg-green-200 text-green-500 border border-green-500"
                    : "bg-white border border-gray-300"
                )}
              />
              <span
                onClick={() =>
                  handleSelectAllChange(selectedItems?.length !== items.length)
                }
                className="cursor-pointer text-[16px]  font-medium"
              >
                All {label}
              </span>
            </div>
            {items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-start gap-2 px-4 py-2.5"
              >
                <Checkbox
                  checked={selectedItems?.includes(item.id)}
                  onCheckedChange={() => handleCheckboxChange(item.id)}
                  className={cn(
                    "form-checkbox h-5 w-5 rounded-lg",
                    selectedItems?.includes(item.id)
                      ? "bg-green-200 text-green-500 border border-green-500"
                      : "bg-white border border-gray-300"
                  )}
                />
                <div
                  onClick={() => handleCheckboxChange(item.id)}
                  className={cn(
                    "cursor-pointer text-[16px] font-normal ",
                    item?.className
                  )}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
