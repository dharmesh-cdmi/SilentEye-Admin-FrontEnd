import { DataTable } from "@/components/common/Table/data-table";
import { CircleDollarSign, Plane } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import CustomTabs from "@/components/common/custom-tabs";
import { SupportTicketAPI } from "@/api/endpoints";
import CommonSearch from "@/components/ui/search";
import TicketColumns from "./components/columns";
import Header from "@/components/common/header";
import Loader from "@/components/common/loader";
import { useMemo, useState } from "react";
import useGet from "@/hooks/use-get";

export default function SupportTicket() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "All", icon: CircleDollarSign, label: "All" },
    { value: "Pending", icon: OrdersIcon, label: "Pending" },
    { value: "Answered", icon: RefundIcons, label: "Answered" },
    { value: "Closed", icon: Plane, label: "Closed" },
  ];

  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filter = useMemo(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("searchQuery", searchQuery);
    if (activeTab !== "All") params.append("status", activeTab);
    return params.toString();
  }, [activeTab, searchQuery]);

  const {
    isLoading,
    data: { data: { data: supportData } = {} } = {},
    refetch: ticketRefecth,
  } = useGet({
    key: "supportData",
    endpoint: `${SupportTicketAPI.AllData}?${filter}`,
  });

  return (
    <div>
      <Header title="Support Ticket">
        <CommonSearch onSearch={setSearchQuery} />
      </Header>

      <div className="w-full">
        <Tabs // This is Shadcn Tabs
          orientation="vertical"
          defaultValue={activeTab}
          className="h-full rounded-none"
        >
          <CustomTabs
            value={activeTab}
            tabs={tabsConfig}
            setIsActive={setActiveTab}
          />
          {tabsConfig.map(({ value }) => (
            <TabsContent key={value} value={value}>
              {isLoading ? (
                <Loader />
              ) : (
                <DataTable
                  data={supportData?.tickets || []}
                  columns={TicketColumns(ticketRefecth)}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
