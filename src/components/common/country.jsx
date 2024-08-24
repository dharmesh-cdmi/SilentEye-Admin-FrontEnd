import { WebIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import ReactCountryFlag from "react-country-flag";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CountryAPI } from "@/api/endpoints";
import useGet from "@/hooks/use-get";

export default function Country({ selectedCountries, setSelectedCountries }) {
  const { data: { data: { data: countriesdata } = {} } = {} } = useGet({
    key: "countriesdata",
    endpoint: `${CountryAPI.CountryList}`,
  });

  const [isOpen, setIsOpen] = useState(false);
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
      setSelectedCountries(countriesdata.map((country) => country.id));
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
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          // resetValues();
        }
        setIsOpen(open);
      }}
    >
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
      <PopoverContent className="max-w-[320px] px-0 py-0">
        <div className=" ">
          <div className="w-full border-b mb-1">
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

          <div className="px-4 flex items-center gap-2.5 py-2.5 border-b">
            <Checkbox
              checked={selectedCountries.length === countriesdata?.length}
              onCheckedChange={handleSelectAllChange}
              className={cn(
                "form-checkbox h-5 w-5 rounded-md",
                selectedCountries.length === countriesdata?.length
                  ? "bg-green-200 text-green-500 border border-green-500"
                  : "bg-white border border-gray-300"
              )}
            />
            <span className="text-sm font-normal">All Countries</span>
          </div>

          <div
            className="max-h-80 overflow-y-scroll "
            style={{
              overflow: "auto",
              msOverflowStyle: "none", // Internet Explorer 10+
              scrollbarWidth: "none", // Firefox
            }}
          >
            {filteredCountries?.map((country) => (
              <div key={country.id} className="flex items-center border-b">
                <div className="w-full px-4 py-2 flex items-center justify-start ">
                  <Checkbox
                    checked={selectedCountries?.includes(country.id)}
                    onCheckedChange={() => handleCheckboxChange(country.id)}
                    className={cn(
                      "form-checkbox h-5 w-5 rounded-md",
                      selectedCountries.includes(country.id)
                        ? "bg-green-200 text-green-500 border border-green-500"
                        : "bg-white border border-gray-300"
                    )}
                  />
                  <div
                    className="flex items-center gap-2 px-2.5 cursor-pointer"
                    onClick={() => handleCheckboxChange(country.id)}
                  >
                    <div className="flex items-center justify-center ">
                      <ReactCountryFlag
                        countryCode={country.icon}
                        style={{
                          borderRadius: "8px",
                          fontSize: "28px",
                        }}
                        svg
                      />
                    </div>
                    <span className="text-sm font-normal">{country.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
