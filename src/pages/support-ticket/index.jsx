import { DataTable } from "@/components/common/Table/data-table";
import { CircleDollarSign, Plane } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import CustomTabs from "@/components/common/custom-tabs";
import { columns } from "./components/columns";
import CommonSearch from "@/components/ui/search";
import Header from "@/components/common/header";
import { data } from "./data";

export default function SupportTicket() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "all", icon: CircleDollarSign, label: "All" },
    { value: "pending", icon: OrdersIcon, label: "Pending" },
    { value: "answered", icon: RefundIcons, label: "Answered" },
    { value: "closed", icon: Plane, label: "Closed" },
  ];
  return (
    <div>
      <Header title="Support Ticket">
        <CommonSearch />
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
