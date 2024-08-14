import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; // Make sure these are correctly imported
import { cn } from "@/lib/utils";

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
      <AccordionItem value="item-1">
        <AccordionTrigger
        //   className="cursor-pointer h-[43px] rounded-lg border flex justify-center px-4 items-center space-x-2"
        >
          {label}
        </AccordionTrigger>
        <AccordionContent>
          <div className="border-b">
            <div className="px-4 flex justify-start items-center space-x-2 py-2">
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
              <span className="text-[16px]  font-semibold">All {label}</span>
            </div>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-2 border-b"
              >
                <div className="px-4 py-2 flex items-center justify-start space-x-2">
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
                  <div className={cn("text-[16px] font-normal ",item?.className)}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
