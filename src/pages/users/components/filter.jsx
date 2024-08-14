import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SlidersHorizontal } from "lucide-react";
import { statuses, process } from "./data/staticdata";
import ItemSelector from "@/components/common/item-selector";

const Filter = ({
  statusSelected,
  setStatusSelected,
  processSelected,
  setProcessSelected,
}) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="space-x-2 flex ">
            <SlidersHorizontal size={18} />
            <h2>Filter</h2>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-56 flex flex-col divide-y p-0">
          <ItemSelector
            items={statuses}
            selectedItems={statusSelected}
            setSelectedItems={setStatusSelected}
            label="Status"
          />
          <ItemSelector
            items={process}
            selectedItems={processSelected}
            setSelectedItems={setProcessSelected}
            label="Process"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Filter;
