import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import SettingDialog from "./components/setting-dialog";
import CustomTabs from "@/components/common/custom-tabs";
import { CircleDollarSign, Plane } from "lucide-react";
import { RefundRequestAPI } from "@/api/endpoints";
import CommonSearch from "@/components/ui/search";
import Header from "@/components/common/header";
import RefundColumns from "./components/columns";
import Loader from "@/components/common/loader";
import useGet from "@/hooks/use-get";

export default function RefundRequest() {
  const tabsConfig = [
    { value: "all", icon: CircleDollarSign, label: "All" },
    { value: "pending", icon: OrdersIcon, label: "Pending" },
    { value: "approved", icon: RefundIcons, label: "Approved" },
    { value: "rejected", icon: Plane, label: "Rejected" },
    { value: "refunded", icon: Plane, label: "Refunded" },
    { value: "true-refunded", icon: Plane, label: "True Refunded" },
  ];

  const {
    isLoading,
    data: { data: { data: refundData } = {} } = {},
    refetch: refundRefecth,
  } = useGet({
    key: "refundData",
    endpoint: RefundRequestAPI.AllRefundRequest,
  });

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

          {tabsConfig.map((item, index) => (
            <TabsContent key={index} value={item.value}>
              {isLoading ? (
                <Loader />
              ) : (
                <DataTable
                  data={refundData?.docs || []}
                  columns={RefundColumns(refundRefecth)}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
