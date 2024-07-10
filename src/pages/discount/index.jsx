import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import CustomTabs from "@/components/common/custom-tabs";
import { CircleDollarSign } from "lucide-react";
import { columns } from "./components/columns";
import Header from "@/components/common/header";
import CouponForm from "./components/coupon-form";
import { data } from "./data";

export default function Discount() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "all", icon: CircleDollarSign, label: "All" },
    { value: "active", icon: OrdersIcon, label: "Active" },
    { value: "expired", icon: RefundIcons, label: "Expired" },
  ];

  const initialValues = {
    coupon: "",
    discount: "",
    validityDate: "",
    validityTime: "",
    limit: "",
  };

  const handleAddSubmit = (values) => {
    console.log("Adding coupon:", values);
  };

  const handleEditSubmit = (values) => {
    console.log("Editing coupon:", values);
  };

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
            <CouponForm
              initialValues={{
                coupon: "SUMMER2024",
                discount: 20,
                validityDate: "2024-07-31",
                validityTime: "12:00",
                limit: 100,
              }}
              onSubmit={handleEditSubmit}
            />
          </TabsContent>
          <TabsContent value="expired">
            <CouponForm
              initialValues={initialValues}
              onSubmit={handleAddSubmit}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
