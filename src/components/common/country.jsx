import { WebIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import ReactCountryFlag from "react-country-flag";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const countries = [
  { id: "GB", label: "United Kingdom", icon: "GB" },
  { id: "US", label: "United States", icon: "US" },
  { id: "DE", label: "Germany", icon: "DE" },
  { id: "CN", label: "China", icon: "CN" },
  { id: "FR", label: "France", icon: "FR" },
  { id: "JP", label: "Japan", icon: "JP" },
  { id: "CO", label: "Colombia", icon: "CO" },
  { id: "ES", label: "Spain", icon: "ES" },
];

export default function Country() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (id) => {
    setSelectedCountries((prev) =>
      prev.includes(id)
        ? prev.filter((countryId) => countryId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAllChange = (checked) => {
    if (checked) {
      setSelectedCountries(countries.map((country) => country.id));
    } else {
      setSelectedCountries([]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //   const handleSubmit = () => {
  //     alert(`Selected countries: ${JSON.stringify(selectedCountries, null, 2)}`);
  //   };

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Popover open={isOpen}
    onOpenChange={(open) => {
      if (!open) {
        // resetValues();
      }
      setIsOpen(open);
    }}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "cursor-pointer h-[43px]  rounded-lg border flex justify-center px-4 items-center space-x-2"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <WebIcon size={25} />
          <p className="text-[16px] font-medium">Country</p>
          {isOpen ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-[320px]">
        <div className=" ">
          <div className="w-full border-b mb-2 ">
            <div className="flex justify-center items-center px-4 w-full">
              <Search className="w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search Country"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-3 mt-1 ring-0 border-0 focus:outline-none focus:ring-0 focus:border-0"
              />
            </div>
          </div>
          <div className="border-b">
            <div className="px-4 flex justify-start items-center space-x-2 py-2 ">
              <Checkbox
                checked={selectedCountries.length === countries.length}
                onCheckedChange={handleSelectAllChange}
                className={cn(
                  "form-checkbox h-5 w-5 rounded-lg",
                  selectedCountries.length === countries.length
                    ? "bg-green-200 text-green-500 border border-green-500"
                    : "bg-white border border-gray-300"
                )}
              />
              <span className="text-sm font-normal">All Countries</span>
            </div>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {filteredCountries.map((country) => (
              <div
                key={country.id}
                className="flex items-center space-x-2 border-b "
              >
                <div className="px-4 py-2 flex items-center justify-start ">
                  <Checkbox
                    checked={selectedCountries.includes(country.id)}
                    onCheckedChange={() => handleCheckboxChange(country.id)}
                    className={cn(
                      "form-checkbox h-5 w-5 rounded-lg",
                      selectedCountries.includes(country.id)
                        ? "bg-green-200 text-green-500 border border-green-500"
                        : "bg-white border border-gray-300"
                    )}
                  />
                  <div className="mx-2 ">
                    <div className="flex items-center justify-center">
                      <ReactCountryFlag
                        countryCode={country.icon}
                        style={{
                          borderRadius: "8px",
                          fontSize: "28px",
                        }}
                        svg
                      />
                    </div>
                  </div>

                  <span className="text-sm font-normal">{country.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
