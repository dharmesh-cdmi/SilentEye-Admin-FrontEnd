import { DataTable } from "@/components/common/Table/data-table";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { CircleDollarSign, Download, Plane } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import CustomTabs from "@/components/common/custom-tabs";
import CommonButton from "@/components/ui/common-button";
import { columns } from "./components/columns";
import CommonSearch from "@/components/ui/search";
import Header from "@/components/common/header";
import { data } from "./data";

export default function Orders() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "all", icon: CircleDollarSign, label: "All" },
    { value: "pending", icon: OrdersIcon, label: "Pending" },
    { value: "answered", icon: RefundIcons, label: "Answered" },
    { value: "closed", icon: Plane, label: "CLosed" },
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
          defaultValue="all"
          className="h-full rounded-none"
        >
          <CustomTabs tabs={tabsConfig} />
          <TabsContent value="all" className="">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="pending">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="answered">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="closed">
            <DataTable data={data} columns={columns} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
