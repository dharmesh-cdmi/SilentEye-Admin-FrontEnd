import { DataTable } from "@/components/common/Table/data-table";
import { CircleDollarSign, PlusCircle } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import CustomTabs from "@/components/common/custom-tabs";
import { Button } from "@/components/custom/button";
import DiscountColumns from "./components/columns";
import CouponForm from "./components/coupon-form";
import Header from "@/components/common/header";
import Loader from "@/components/common/loader";
import { DiscountAPI } from "@/api/endpoints";
import useGet from "@/hooks/use-get";

export default function Discount() {
  const tabsConfig = [
    { value: "all", icon: CircleDollarSign, label: "All" },
    { value: "active", icon: OrdersIcon, label: "Active" },
    { value: "expired", icon: RefundIcons, label: "Expired" },
  ];

  const {
    isLoading,
    data: { data: { data: discountData } = {} } = {},
    refetch: discountRefetch,
  } = useGet({
    key: "discountData",
    endpoint: `${DiscountAPI.GetAll}${new URLSearchParams()}`,
  });

  const handleTabActive = (activeTabData) => {
    console.log(activeTabData);
  };

  return (
    <div>
      <Header title="Discount"></Header>

      <div className="h-fit w-full relative">
        <Tabs
          orientation="vertical"
          defaultValue="all"
          className="h-full rounded-none"
        >
          <CustomTabs setIsActive={handleTabActive} tabs={tabsConfig} />
          {isLoading ? (
            <Loader />
          ) : (
            tabsConfig.map(({ value }) => (
              <TabsContent key={value} value={value}>
                <DataTable
                  data={discountData?.docs || []}
                  columns={DiscountColumns(discountRefetch)}
                />
              </TabsContent>
            ))
          )}
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
