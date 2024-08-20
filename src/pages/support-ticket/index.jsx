import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CustomTabs from "@/components/common/custom-tabs";
import { SupportTicketAPI } from "@/api/endpoints";
import CommonSearch from "@/components/ui/search";
import TicketColumns from "./components/columns";
import Header from "@/components/common/header";
import Loader from "@/components/common/loader";
import { TrashIcon } from "@/assets/icons";
import { useMemo, useState } from "react";
import useUpdate from "@/hooks/use-update";
import adminAPI from "@/api/adminAPI";
import toast from "react-hot-toast";
import useGet from "@/hooks/use-get";

export default function SupportTicket() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "All", label: "All" },
    { value: "Pending", label: "Pending" },
    { value: "Answered", label: "Answered" },
    { value: "Closed", label: "Closed" },
  ];

  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filter = useMemo(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("searchQuery", searchQuery);
    if (activeTab !== "All") params.append("status", activeTab);
    params.append("pageIndex", currentPage);
    params.append("limit", limit);
    return params.toString();
  }, [activeTab, currentPage, limit, searchQuery]);

  const {
    isLoading,
    data: { data: { data: supportData } = {} } = {},
    refetch: ticketRefecth,
  } = useGet({
    key: "supportData",
    endpoint: `${SupportTicketAPI.AllData}?${filter}`,
  });

  const { mutateAsync: bulkUpdate } = useUpdate({
    endpoint: SupportTicketAPI.BulkUpdate,
    isMultiPart: false,
  });

  const handleBulkDelete = async (table) => {
    const rows = table.getFilteredSelectedRowModel().rows;
    const selected = rows.map((row) => row.original._id);
    try {
      const res = await adminAPI.delete(SupportTicketAPI.BulkDelete, {
        data: { ticketIds: selected },
      });
      ticketRefecth();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response.data.message || "Failed to delete selected tickets"
      );
    } finally {
      table.toggleAllRowsSelected(false);
    }
  };

  const handleBulkEdit = async (table, status) => {
    const rows = table.getFilteredSelectedRowModel().rows;
    const selected = rows.map((row) => row.original._id);

    try {
      const res = await bulkUpdate({
        ticketIds: selected,
        status,
      });
      ticketRefecth();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Failed to update selected tickets status"
      );
    } finally {
      table.toggleAllRowsSelected(false);
    }
  };

  const actionButtons = [
    {
      className: "h-9 font-normal shadow text-nowrap",
      icon: TrashIcon,
      iconClassName: "text-red-500",
      label: "Delete All",
      onClick: handleBulkDelete,
    },
    {
      className:
        "w-fit h-9 hover:shadow-none font-normal text-nowrap shadow-none",
      label: "Change Status to All:",
    },
    {
      className:
        "w-fit h-9 px-4 bg-yellow-500 hover:shadow-none hover:opacity-90 font-normal text-white shadow-none duration-300",
      label: "Pending",
      onClick: (table) => handleBulkEdit(table, "Pending"),
    },
    {
      className:
        "w-fit h-9 px-4 bg-green-500 hover:shadow-none hover:opacity-90 font-normal text-white shadow-none duration-300",
      label: "Active",
      onClick: (table) => handleBulkEdit(table, "Active"),
    },
    {
      className:
        "w-fit h-9 px-4 bg-blue-600 hover:shadow-none hover:opacity-90 font-normal text-white shadow-none duration-300",
      label: "Answered",
      onClick: (table) => handleBulkEdit(table, "Answered"),
    },
    {
      className:
        "w-fit h-9 px-4 bg-gray-500 hover:shadow-none hover:opacity-90 font-normal text-white shadow-none duration-300",
      label: "Closed",
      onClick: (table) => handleBulkEdit(table, "Closed"),
    },
  ];

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
                  actionButtons={actionButtons}
                  pagination={{
                    limit,
                    setLimit,
                    currentPage,
                    setCurrentPage,
                    totalData: supportData?.totalDocs,
                  }}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
