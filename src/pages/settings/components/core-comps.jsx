import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const SettingsLabel = ({ label, icon = "", className }) => (
  <div
    className={cn(
      "flex items-center gap-2 text-muted-foreground h-10 border-t w-[115px] [&>h3]:text-[15px] px-3.5 py-2 font-medium",
      className
    )}
  >
    {icon} <h3>{label}</h3>
  </div>
);

const TimeDropdown = ({ state, onStateChange, ...props }) => {
  const menuItems = [
    {
      label: "Seconds",
      value: "s",
    },
    {
      label: "Minutes",
      value: "m",
    },
    {
      label: "Hours",
      value: "h",
    },
    {
      label: "Days",
      value: "d",
    },
  ];
  const inputFieldClass = cn(
    "rounded-none rounded-br-xl outline-none font-medium w-11 text-center",
    props.inputClass
  );
  const inputBoxClass = cn("border-b-0 border-r-0", inputFieldClass);

  const handleStateChange = (change, key) => {
    if (key === "quantity") {
      state[key] = change !== "" ? +change : change;
    } else {
      state[key] = change;
    }
    onStateChange(state);
  };

  const getLabelFromUnit = () => {
    return menuItems.filter((ele) => ele.value === state.unit)[0]["label"];
  };

  return (
    <section className="flex">
      <SettingsLabel
        label={props.label}
        icon={props.icon}
        className={props.labelClass}
      />
      <Input
        type="number"
        inputBoxClass={inputBoxClass}
        className={inputFieldClass}
        required
        value={state.quantity}
        onChange={(e) => handleStateChange(e.target.value, "quantity")}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-none border-b-0">
            {getLabelFromUnit()}
            <ChevronDown size={16} className="ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start">
          {menuItems.map((ele, ind) => (
            <DropdownMenuItem
              key={ind}
              onClick={() => handleStateChange(ele.value, "unit")}
            >
              {ele.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export { SettingsLabel, TimeDropdown };
