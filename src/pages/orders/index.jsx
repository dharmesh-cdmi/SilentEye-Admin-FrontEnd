import { CircleDollarSign, Download, Plane } from "lucide-react";
import { DataTable } from "@/components/common/Table/data-table";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import CustomTabs from "@/components/common/custom-tabs";
import CommonSearch from "@/components/ui/search";
import Header from "@/components/common/header";
import CommonButton from "@/components/ui/common-button";
import { Order } from "@/api/endpoints";
import useGet from "@/hooks/use-get";
import Loader from "@/components/common/loader";
import { PurchaseColumns } from "./components/purchase-column";
import { useMemo, useState } from "react";
import useFilteredParams from "@/hooks/useFilterParams";
import { fileDownload } from "@/lib/utils";
import CountryOrder from "@/components/common/country-order";

export default function Orders() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "Completed", icon: CircleDollarSign, label: "Purchase" },
    { value: "Pending", icon: OrdersIcon, label: "Checkout" },
    { value: "Refunded", icon: RefundIcons, label: "Refunded" },
    { value: "Shipping", icon: Plane, label: "Shipping" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [isActive, setIsActive] = useState("Completed");

  const filter = useMemo(
    () => ({
      status: isActive,
      search: searchTerm || null,
      country: selectedCountries || null,
      startDate: dateRange.from || null,
      endDate: dateRange.to || null,
    }),
    [isActive,searchTerm, selectedCountries, dateRange]
  );

  const filterParams = useFilteredParams(filter);

  const handleDateRangeUpdate = (range) => {
    setDateRange(range);
  };

  const {
    data: { data: { data: ordersData } = {} } = {},
    isLoading: ordersLoading,
    refetch: OrderRefetch,
  } = useGet({
    key: "ordersData",
    endpoint: `${Order.Order_Details}?${new URLSearchParams(filterParams)}`,
  });

  const handleDownload = async () => {
    await fileDownload(Order.Download_Order);
  };

  return (
    <div>
      <Header title="Orders" className=" ">
        <CommonSearch onSearch={setSearchTerm} />
        <CountryOrder
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          
        />
        <DateRangePicker onUpdate={handleDateRangeUpdate} />
        <CommonButton onClick={handleDownload}>
          <Download className="w-6 h-6" />
        </CommonButton>
      </Header>

      <div className="w-full">
        <Tabs // This is Shadcn Tabs
          orientation="vertical"
          defaultValue={isActive}
        >
          {/* This is Common TabsListCompnent  */}
          <CustomTabs tabs={tabsConfig} setIsActive={setIsActive} />
          {tabsConfig?.map((item, id) => (
            <TabsContent value={item?.value} className="" key={id}>
              {ordersLoading ? (
                <Loader />
              ) : (
                <DataTable
                  data={ordersData?.orders || []}
                  columns={PurchaseColumns({
                    tabKey: isActive,
                    orderRefetch: OrderRefetch,
                  })}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
