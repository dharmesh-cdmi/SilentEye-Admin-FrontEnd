import { useState } from "react";
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
import { Order } from "@/api/endpoints";

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

  const {
    data: { data: { data: ordersData } = {} } = {},
    isLoading: ordersLoading,
    refetch: OrderRefetch, 
  } = useGet({
    key: "ordersData",
    endpoint: Order.Order_Details,
  });
  return (
    <div>
      <Header title="Users" className=" ">
        <CommonSearch />
        <Country />
        <DateRangePicker />
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
              {ordersLoading ? (
                <Loader />
              ) : (
                <DataTable
                  data={ordersData?.orders || []}
                  columns={DefaultColumn({tabKey: isActive , orderRefetch: OrderRefetch})}
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
