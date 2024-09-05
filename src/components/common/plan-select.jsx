import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { BagIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { PROD_IMG_Prefix } from "@/api/endpoints";

export default function PlanSelect({
  selectedProducts,
  setSelectedProducts,
  productsData,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (id) => {
    setSelectedProducts(prev => (prev.includes(id) ? [] : [id]));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = productsData?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <div
          className={cn(
            "cursor-pointer h-[43px] rounded-lg  flex justify-start px-4 items-center space-x-2"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <BagIcon size={20} />
          <p className="text-[16px] font-medium">Products</p>
          {isOpen ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-[320px] px-0 py-0">
        <div className="">
          <div className="w-full border-b mb-1">
            <div className="flex justify-center items-center px-4 w-full">
              <Search className="w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search Product"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-3 mt-1 ring-0 border-0 focus:outline-none focus:ring-0 focus:border-0"
              />
            </div>
          </div>

          <div
            className="max-h-80 overflow-y-scroll"
            style={{
              overflow: "auto",
              msOverflowStyle: "none", // Internet Explorer 10+
              scrollbarWidth: "none", // Firefox
            }}
          >
            {filteredProducts?.map((product) => {
              const img = PROD_IMG_Prefix + product?.mainImage; 
              return (
                <div key={product._id} className="flex items-center border-b">
                  <div className="w-full px-4 py-2 flex items-center justify-start ">
                    <Checkbox
                      checked={selectedProducts?.includes(product._id)}
                      onCheckedChange={() => handleCheckboxChange(product._id)}
                      className={cn(
                        "form-checkbox h-5 w-5 rounded-md",
                        selectedProducts.includes(product._id)
                          ? "bg-green-200 text-green-500 border border-green-500"
                          : "bg-white border border-gray-300"
                      )}
                    />
                    <div
                      className="flex items-center gap-2 px-2.5 cursor-pointer"
                      onClick={() => handleCheckboxChange(product._id)}
                    >
                      <img
                        src={img || "/Logo.svg"}
                        alt={product.name}
                        className="h-8 w-8 rounded"
                      />
                      <span className="text-sm font-normal">
                        {product.title}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}