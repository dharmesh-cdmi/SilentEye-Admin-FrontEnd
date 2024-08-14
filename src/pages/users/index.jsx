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


export default function Users() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "all",  label: "All" },
    { value: "demo",  label: "Demo" },
    { value: "checkout", label: "Checkout" },
    { value: "paymentinitiat",  label: "Payment Initiated" },
    { value: "purchased", label: "Purchased" },
    { value: "loggedin", label: "Logged In" },
    { value: "refund", label: "Refund Requested" },
    { value: "blocked", label: "Blocked" },
  ];

  const actionButtons = [
    {
      label: 'Delete All',
      className: 'bg-red-400 text-white ',
      icon: Trash2, 

      onClick: () => {
        // Implement your delete logic here
        console.log('Delete all selected rows');
      },
    },
    {
      label: 'Block All',
      className: 'btn-warning',
      icon: UserX,
      onClick: () => {
        // Implement your block logic here
        console.log('Block all selected rows');
      },
    },
  ];

  const [isActive,setIsActive] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  
  const filter = useMemo(() => ({
    userStatus: isActive,
    searchQuery: searchTerm,
    country: selectedCountries,
    fromDate: dateRange.start,
    toDate: dateRange.end,
  }), [isActive, searchTerm, selectedCountries, dateRange]);

  const {
    data: { data: { data: usersData } = {} } = {},
    isLoading: usersLoading,
    refetch: UserRefetch, 
  } = useGet({
    key: "usersData",
    endpoint: `${UserAPI.AllUsers}?${new URLSearchParams(filter)}`
  });

  useEffect(()=> {
    UserRefetch();
  },[filter,UserRefetch])

  const handleDateRangeUpdate = (range) => {
    setDateRange(range);
  };

  return (
    <div>
      <Header title="Users" className=" ">
        <CommonSearch onSearch={setSearchTerm}/>
        <Country selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries}/>
        <DateRangePicker onUpdate={handleDateRangeUpdate}/>
        <CommonButton>
          <Download className="w-6 h-6" />
        </CommonButton>
      </Header>

      <div className="w-full">
        <Tabs // This is Shadcn Tabs
          orientation="vertical"
          defaultValue="all"
        >
          {/* This is Common TabsListCompnent  */}
          <CustomTabs tabs={tabsConfig} setIsActive={setIsActive}/>
          {tabsConfig?.map((item, id) => (
            <TabsContent value={item?.value} className="" key={id}>
              {usersLoading ? (
                <Loader />
              ) : (
                <DataTable
                  data={usersData?.users || []}
                  columns={DefaultColumn({tabKey: isActive , UserRefetch: UserRefetch })}
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
