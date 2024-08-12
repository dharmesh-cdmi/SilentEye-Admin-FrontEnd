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
import { useMemo, useState } from "react";

export default function RefundRequest() {
  const tabsConfig = [
    { value: "All", icon: CircleDollarSign, label: "All" },
    { value: "Pending", icon: OrdersIcon, label: "Pending" },
    { value: "Approved", icon: RefundIcons, label: "Approved" },
    { value: "Rejected", icon: Plane, label: "Rejected" },
    { value: "Refunded", icon: Plane, label: "Refunded" },
    { value: "True Refunded", icon: Plane, label: "True Refunded" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filter = useMemo(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (activeTab !== "All") params.append("filterStatus", activeTab);
    return params.toString();
  }, [activeTab, searchQuery]);

  const {
    isLoading,
    data: { data: { data: refundData } = {} } = {},
    refetch: refundRefecth,
  } = useGet({
    key: "refundData",
    endpoint: `${RefundRequestAPI.AllRefundRequest}?${filter}`,
  });

  return (
    <div>
      <Header title="Refund Request">
        <CommonSearch onSearch={setSearchQuery} />
        <SettingDialog />
      </Header>

      <div className="w-full">
        <Tabs
          orientation="vertical"
          defaultValue={activeTab}
          className="h-full rounded-none"
        >
          <CustomTabs tabs={tabsConfig} setIsActive={setActiveTab} />

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
