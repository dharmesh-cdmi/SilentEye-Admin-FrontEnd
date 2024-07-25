import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import CustomTabs from "@/components/common/custom-tabs";
import { CircleDollarSign, PlusCircle } from "lucide-react";
import { columns } from "./components/columns";
import Header from "@/components/common/header";
import { data } from "./data";
import CouponForm from "./components/coupon-form";
import { Button } from "@/components/custom/button";

export default function Discount() {
  const tabsConfig = [
    { value: "all", icon: CircleDollarSign, label: "All" },
    { value: "active", icon: OrdersIcon, label: "Active" },
    { value: "expired", icon: RefundIcons, label: "Expired" },
  ];

  return (
    <div>
      <Header title="Discount"></Header>

      <div className="h-fit w-full relative">
        <Tabs
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

        <CouponForm onSubmit={(data) => console.log(data)}>
          <Button className="h-12 flex items-center gap-1.5 absolute top-0 right-0 bg-transparent text-lg text-black hover:text-white shadow-none border-l rounded-none rounded-tr-xl">
            <PlusCircle size={20} /> Add Coupon
          </Button>
        </CouponForm>
      </div>
    </div>
  );
}
