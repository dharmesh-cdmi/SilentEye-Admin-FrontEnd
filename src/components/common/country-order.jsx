import { WebIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import ReactCountryFlag from "react-country-flag";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CountryAPI } from "@/api/endpoints";
import useGet from "@/hooks/use-get";


export default function CountryOrder({ selectedCountries, setSelectedCountries }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: { data: { data: countriesdata } = {} } = {},
  } = useGet({
    key: "countriesdata",
    endpoint: `${CountryAPI.CountryList}`,
  });

  const handleCheckboxChange = (label) => {
    setSelectedCountries((prev) =>
      prev.includes(label)
        ? prev.filter((countryLabel) => countryLabel !== label)
        : [...prev, label]
    );
  };

  const handleSelectAllChange = (checked) => {
    if (checked) {
      setSelectedCountries(countriesdata?.map((country) => country.label));
    } else {
      setSelectedCountries([]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCountries = countriesdata?.filter((country) =>
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
            "cursor-pointer h-[43px] rounded-lg border flex justify-center px-4 items-center space-x-2"
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
                checked={selectedCountries.length === countriesdata?.length}
                onCheckedChange={handleSelectAllChange}
                className={cn(
                  "form-checkbox h-5 w-5 rounded-lg",
                  selectedCountries.length === countriesdata?.length
                    ? "bg-green-200 text-green-500 border border-green-500"
                    : "bg-white border border-gray-300"
                )}
              />
              <span className="text-sm font-normal">All countriesdata</span>
            </div>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {filteredCountries?.map((country) => (
              <div
                key={country.id}
                className="flex items-center space-x-2 border-b "
              >
                <div className="px-4 py-2 flex items-center justify-start ">
                  <Checkbox
                    checked={selectedCountries.includes(country.label)}
                    onCheckedChange={() => handleCheckboxChange(country.label)}
                    className={cn(
                      "form-checkbox h-5 w-5 rounded-lg",
                      selectedCountries.includes(country.label)
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
