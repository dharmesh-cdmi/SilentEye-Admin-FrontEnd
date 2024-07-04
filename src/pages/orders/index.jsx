import { DataTable } from "@/components/common/Table/data-table";
import { tasks } from "./data/task";
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
    { value: "purchase", icon: CircleDollarSign, label: "Purchase" },
    { value: "checkout", icon: OrdersIcon, label: "Checkout" },
    { value: "refunded", icon: RefundIcons, label: "Refunded" },
    { value: "shipping", icon: Plane, label: "Shipping" },
  ];
  return (
    <div>
      <Header title="Orders">
        <CommonSearch />
        <DateRangePicker />
        <CommonButton>
        <Download className="w-7 h-7"/>
        </CommonButton>
      </Header>

      <div className="w-full">
        <Tabs // This is Shadcn Tabs
          orientation="vertical"
          defaultValue="purchase"
          //  className="space-y-4 h-full" //</div>==> You can add ClassName here according to your customization
        >
          {/* This is Common TabsListCompnent  */}
          <CustomTabs tabs={tabsConfig} />
          <TabsContent value="purchase" className="">
            <DataTable data={tasks} columns={columns} />
          </TabsContent>
          <TabsContent value="checkout" className=" bg-orange-400 ">
            <div>hello</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
