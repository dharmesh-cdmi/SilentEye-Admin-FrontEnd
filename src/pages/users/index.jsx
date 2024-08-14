import { useEffect, useMemo, useState } from "react";
import { Download, Trash2, UserX } from "lucide-react";
import Loader from "@/components/common/loader";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import CommonSearch from "@/components/ui/search";
import Header from "@/components/common/header";
import CommonButton from "@/components/ui/common-button";
import Country from "@/components/common/country";
import useGet from "@/hooks/use-get";
import CustomTabs from "@/components/common/custom-tabs";
import { DataTable } from "@/components/common/Table/data-table";
import { DefaultColumn } from "./components/defaultColumn";
import { UserAPI } from "@/api/endpoints";
import { fileDownload } from "@/lib/utils";
import Filter from "./components/filter";

export default function Users() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "all", label: "All" },
    { value: "Demo", label: "Demo" },
    { value: "Checkout", label: "Checkout" },
    { value: "Paymentinitiat", label: "Payment Initiated" },
    { value: "Paid", label: "Paid" },
    { value: "Purchased", label: "Purchased" },
    { value: "Loggedin", label: "Logged In" },
    { value: "Refund", label: "Refund Requested" },
    { value: "Blocked", label: "Blocked" },
  ];

  const actionButtons = [
    {
      label: "Delete All",
      className: "bg-red-400 text-white ",
      icon: Trash2,

      onClick: () => {
        // Implement your delete logic here
        console.log("Delete all selected rows");
      },
    },
    {
      label: "Block All",
      className: "btn-warning",
      icon: UserX,
      onClick: () => {
        // Implement your block logic here
        console.log("Block all selected rows");
      },
    },
  ];

  const [isActive, setIsActive] = useState("all");
  const [searchTerm, setSearchTerm] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [statusSelected, setStatusSelected] = useState([]);
  const [processSelected, setProcessSelected] = useState([]);

  const filter = useMemo(() => {
    const params = new URLSearchParams();

    if (isActive !== "all") {
      params.append("userStatus", isActive);
    }
    if (searchTerm) {
      params.append("searchQuery", searchTerm);
    }
    if (selectedCountries && selectedCountries.length > 0) {
      params.append("country", selectedCountries.join(","));
    }
    if (dateRange?.start) {
      params.append("fromDate", dateRange.start);
    }
    if (dateRange?.end) {
      params.append("toDate", dateRange.end);
    }
    if (statusSelected && statusSelected.length > 0) {
      params.append("userStatus", statusSelected);
      setStatusSelected([])
    }
    if (processSelected && processSelected.length > 0) {
      params.append("process", processSelected);
    }

    return params.toString(); // Converts to a query string
  }, [isActive, searchTerm, selectedCountries, dateRange,statusSelected,processSelected]);

  const {
    data: { data: { data: usersData } = {} } = {},
    isLoading: usersLoading,
    refetch: UserRefetch,
  } = useGet({
    key: "usersData",
    endpoint: `${UserAPI.AllUsers}/?${filter}`,
  });

  useEffect(() => {
    UserRefetch();
  }, [filter, UserRefetch]);

  const handleDateRangeUpdate = (range) => {
    setDateRange(range);
  };

  const handleDownload = async () => {
    await fileDownload(UserAPI.DownloadUser);
  };

  return (
    <div>
      <Header title="Users" className=" ">
        <CommonSearch onSearch={setSearchTerm} />
        <Country
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
        />
        <DateRangePicker onUpdate={handleDateRangeUpdate} />
        <Filter
          statusSelected={statusSelected}
          setStatusSelected={setStatusSelected}
          processSelected={processSelected}
          setProcessSelected={setProcessSelected}
        />
        <CommonButton onClick={handleDownload}>
          <Download className="w-6 h-6" />
        </CommonButton>
      </Header>

      <div className="w-full">
        <Tabs // This is Shadcn Tabs
          orientation="vertical"
          defaultValue="all"
        >
          {/* This is Common TabsListCompnent  */}
          <CustomTabs tabs={tabsConfig} setIsActive={setIsActive} />
          {tabsConfig?.map((item, id) => (
            <TabsContent value={item?.value} className="" key={id}>
              {usersLoading ? (
                <Loader />
              ) : (
                <DataTable
                  data={usersData?.users || []}
                  columns={DefaultColumn({
                    tabKey: isActive,
                    UserRefetch: UserRefetch,
                  })}
                  actionButtons={actionButtons}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
