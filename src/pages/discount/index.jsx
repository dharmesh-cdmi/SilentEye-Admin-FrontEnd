import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import CustomTabs from "@/components/common/custom-tabs";
import { CircleDollarSign } from "lucide-react";
import { columns } from "./components/columns";
import Header from "@/components/common/header";
import { data } from "./data";

export default function Orders() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "all", icon: CircleDollarSign, label: "All" },
    { value: "active", icon: OrdersIcon, label: "Active" },
    { value: "expired", icon: RefundIcons, label: "Expired" },
  ];

  return (
    <div>
      <Header title="Discount"></Header>

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
          <TabsContent value="active">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="expired">
            <DataTable data={data} columns={columns} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
