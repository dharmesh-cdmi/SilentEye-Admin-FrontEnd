import AddPaymentGatewayForm from "./components/add-payment-gateway-form";
import { DataTable } from "@/components/common/Table/data-table";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CircleDollarSign, Download } from "lucide-react";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import CustomTabs from "@/components/common/custom-tabs";
import CommonButton from "@/components/ui/common-button";
import CommonSearch from "@/components/ui/search";
import Header from "@/components/common/header";
import { columns } from "./components/columns";
import { data } from "./data";

export default function PaymentGateWay() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "all", icon: CircleDollarSign, label: "All" },
    { value: "active", icon: OrdersIcon, label: "Active" },
    { value: "disabled", icon: RefundIcons, label: "Disabled" },
  ];
  return (
    <div>
      <Header title="Payment Gateways">
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
          <TabsContent value="active">
            {/* <DataTable data={data} columns={columns} /> */}
            <AddPaymentGatewayForm />
          </TabsContent>
          <TabsContent value="disabled">
            <DataTable data={data} columns={columns} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
