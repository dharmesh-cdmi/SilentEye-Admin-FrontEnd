import { WebIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function CommonSelector({ items, selectedItems, setSelectedItems, label = "Items", searchPlaceholder = "Search" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAllChange = (checked) => {
    if (checked) {
      setSelectedItems(items.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items?.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger asChild>
        <div
          className={cn(
            "cursor-pointer h-[43px] rounded-lg border flex justify-center px-4 items-center space-x-2"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <WebIcon size={25} />
          <p className="text-[16px] font-medium">{label}</p>
          {isOpen ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-[320px]">
        <div className="w-full border-b mb-2">
          <div className="flex justify-center items-center px-4 w-full">
            <Search className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-3 mt-1 ring-0 border-0 focus:outline-none focus:ring-0 focus:border-0"
            />
          </div>
        </div>
        <div className="border-b">
          <div className="px-4 flex justify-start items-center space-x-2 py-2">
            <Checkbox
              checked={selectedItems?.length === items?.length}
              onCheckedChange={handleSelectAllChange}
              className={cn(
                "form-checkbox h-5 w-5 rounded-lg",
                selectedItems?.length === items?.length
                  ? "bg-green-200 text-green-500 border border-green-500"
                  : "bg-white border border-gray-300"
              )}
            />
            <span className="text-sm font-normal">All {label}</span>
          </div>
        </div>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-2 border-b"
            >
              <div className="px-4 py-2 flex items-center justify-start">
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
                <span className="text-sm font-normal">{item?.label}</span>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
