import { useState } from "react";
import { CircleDollarSign, Download, Plane } from "lucide-react";
import { AddonsIcon, OrdersIcon, ProductsIcon } from "@/assets/icons";
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

export default function Plans() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "subscription", icon: CircleDollarSign, label: "Subscriptions" },
    { value: "upsell", icon: OrdersIcon, label: "UpSell" },
    { value: "addons", icon: AddonsIcon, label: "Add Ons" },
    { value: "products", icon: ProductsIcon, label: "Products" },
    { value: "shipping", icon: Plane, label: "Shipping" },
  ];

  const [isActive,setIsActive] = useState("subscription");

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
      <Header title="Orders" className=" ">
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
          defaultValue="subscription"
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
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
