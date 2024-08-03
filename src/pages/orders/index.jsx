import { CircleDollarSign, Download, Plane } from "lucide-react";
import { DataTable } from "@/components/common/Table/data-table";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import CustomTabs from "@/components/common/custom-tabs";
import CommonSearch from "@/components/ui/search";
import Header from "@/components/common/header";
import CommonButton from "@/components/ui/common-button";
import Country from "@/components/common/country";
import { Order } from "@/api/endpoints";
import useGet from "@/hooks/use-get";
import Loader from "@/components/common/loader";
import { PurchaseColumns } from "./components/purchase-column";
import { useMemo, useState } from "react";

export default function Orders() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "purchase", icon: CircleDollarSign, label: "Purchase" },
    { value: "checkout", icon: OrdersIcon, label: "Checkout" },
    { value: "refunded", icon: RefundIcons, label: "Refunded" },
    { value: "shipping", icon: Plane, label: "Shipping" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [isActive,setIsActive] = useState("purchase");
  const [enabled,setIsEnable] = useState(false);

  const filter = useMemo(() => ({
    // status: isActive,
    search: searchTerm || null,
    country: selectedCountries || null, 
    startDate: dateRange.from || null,
    endDate: dateRange.to || null,
  }), [searchTerm, selectedCountries, dateRange]);


  console.log("date range : ", dateRange);

  const handleDateRangeUpdate = (range) => {
    console.log("RANGE => ", range)
    setDateRange(range);
  };

  const {
    data: { data: { data: ordersData } = {} } = {},
    isLoading: ordersLoading,
    refetch: OrderRefetch, 
  } = useGet({
    key: "ordersData",
    endpoint: `${Order.Order_Details}?${new URLSearchParams(filter)}`
  });

  const {
    data,  
    refetch: DownlaodRefetch,
  } = useGet({
    key: "downloadData",
    endpoint: Order.Download_Order,
    enabled : enabled
  });
  console.log("data: ", data)

  const handleDownload = () =>{
    setIsEnable(true); 
    DownlaodRefetch();
  }




  return (
    <div>
      <Header title="Orders" className=" ">
      <CommonSearch onSearch={setSearchTerm}/>
      <Country selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries}/>
      <DateRangePicker onUpdate={handleDateRangeUpdate}/>
        <CommonButton>
          <Download className="w-6 h-6" onClick={handleDownload}/>
        </CommonButton>
      </Header>

      <div className="w-full">
        <Tabs // This is Shadcn Tabs
          orientation="vertical"
          defaultValue="purchase"
          //  className="space-y-4 h-full" //</div>==> You can add ClassName here according to your customization
        >
          {/* This is Common TabsListCompnent  */}
          <CustomTabs tabs={tabsConfig} setIsActive={setIsActive}/>
          {tabsConfig?.map((item, id) => (
            <TabsContent value={item?.value} className="" key={id}>
              {ordersLoading ? (
                <Loader />
              ) : (
                <DataTable
                  data={ordersData?.orders || []}
                  columns={PurchaseColumns({tabKey: isActive , orderRefetch: OrderRefetch})}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
