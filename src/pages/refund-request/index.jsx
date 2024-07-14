import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import SettingDialog from "./components/setting-dialog";
import CustomTabs from "@/components/common/custom-tabs";
import { CircleDollarSign, Plane } from "lucide-react";
import CommonSearch from "@/components/ui/search";
import Header from "@/components/common/header";
import { columns } from "./components/columns";
import { data } from "./data";

export default function RefundRequest() {
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
      <Header title="Refund Request">
        <CommonSearch onSearch={(key) => console.log(key)} />

        <SettingDialog />
      </Header>

      <div className="w-full">
        <Tabs
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
          <TabsContent value="approved">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="rejected">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="refunded">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="true-refunded">
            <DataTable data={data} columns={columns} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
