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
import useFilteredParams from "@/hooks/useFilterParams";
import axios from "axios";

export const ADMIN_BASE_URL =
  import.meta.env.VITE_ADMIN_BASE_URL ?? PROD_ADMIN_BASE_URL;

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
    endpoint: `${Order.Order_Details}?${new URLSearchParams(filterParams)}`
  });

  const {
    data,  
    refetch: DownlaodRefetch,
  } = useGet({
    key: "downloadData",
    enabled : enabled,
    endpoint: Order.Download_Order,
   
  });


  // const handleDownload = () =>{
  //   setIsEnable(true); 
  //   DownlaodRefetch();
  // }
  
  const handleDownload = async () => {
    try {
      const tokenObject = JSON.parse(localStorage.getItem('__auth_tokens')); // Parse the token object
      const token = tokenObject?.accessToken; // Extract the access token
  
      if (!token) {
        throw new Error('No access token found');
      }
      
      // Make API call to get the file
      const response = await fetch(`${ADMIN_BASE_URL}${Order.Download_Order}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
      });
      
      if (response.status === 401) {
        throw new Error('Unauthorized: Please log in.');
      }
      
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      
      // Convert response to blob
      const blob = await response.blob();
      
      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(blob);
      
      // Create a link element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'orders.xlsx'; // Specify file name here
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading the file:', error);
      alert('There was an error downloading the file. Please try again.');
    }
  };
    
  

  return (
    <div>
      <Header title="Orders" className=" ">
      <CommonSearch onSearch={setSearchTerm}/>
      <Country selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries}/>
      <DateRangePicker onUpdate={handleDateRangeUpdate}/>
        <CommonButton onClick={handleDownload}>
          <Download className="w-6 h-6" />
        </CommonButton>
      </Header>

      <div className="w-full">
        <Tabs // This is Shadcn Tabs
          orientation="vertical"
          defaultValue="purchase"
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
