import { DataTable } from "@/components/common/Table/data-table";
import { data } from "./data";
import { columns } from "./components/columns";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CircleDollarSign, Download, Plane } from "lucide-react";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import CustomTabs from "@/components/common/custom-tabs";
import CommonSearch from "@/components/ui/search";
import Header from "@/components/common/header";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import CommonButton from "@/components/ui/common-button";

export default function Orders() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "all", icon: CircleDollarSign, label: "All" },
    { value: "pending", icon: OrdersIcon, label: "Pending" },
    { value: "approved", icon: RefundIcons, label: "Approved" },
    { value: "rejected", icon: Plane, label: "Rejected" },
    { value: "refunded", icon: Plane, label: "Refunded" },
    { value: "true-refunded", icon: Plane, label: "True Refunded" },
  ];
  return (
    <div>
      <Header title="Orders">
        <CommonSearch />
        <DateRangePicker />
        <CommonButton>
          <Download className="w-7 h-7" />
        </CommonButton>
      </Header>

      <div className="w-full">
        <Tabs // This is Shadcn Tabs
          orientation="vertical"
          defaultValue="purchase"
          className="h-full rounded-none"
        >
          <CustomTabs tabs={tabsConfig} />
          <TabsContent value="all" className="">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="pending" className=" bg-orange-400 ">
            <div>hello</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
