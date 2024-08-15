import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SettingDialog from "./components/setting-dialog";
import CustomTabs from "@/components/common/custom-tabs";
import { RefundRequestAPI } from "@/api/endpoints";
import CommonSearch from "@/components/ui/search";
import Header from "@/components/common/header";
import RefundColumns from "./components/columns";
import Loader from "@/components/common/loader";
import { TrashIcon } from "@/assets/icons";
import { useMemo, useState } from "react";
import useUpdate from "@/hooks/use-update";
import useGet from "@/hooks/use-get";
import toast from "react-hot-toast";

export default function RefundRequest() {
  const tabsConfig = [
    { value: "All", label: "All" },
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
    { value: "Refunded", label: "Refunded" },
    { value: "True Refunded", label: "True Refunded" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const filter = useMemo(() => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    if (searchQuery) params.append("search", searchQuery);
    if (activeTab !== "All") params.append("filterStatus", activeTab);
    return params.toString();
  }, [activeTab, limit, page, searchQuery]);

  const {
    isLoading,
    data: { data: { data: refundData } = {} } = {},
    refetch: refundRefecth,
  } = useGet({
    key: "refundData",
    endpoint: `${RefundRequestAPI.AllRefundRequest}?${filter}`,
  });

  const { mutateAsync: bulkUpdate } = useUpdate({
    endpoint: RefundRequestAPI.BulkUpdate,
    isMultiPart: false,
  });

  const handleBulkDelete = async (table) => {
    const rows = table.getFilteredSelectedRowModel().rows;
    const selected = rows.map((row) => row.original._id);
    try {
      await adminAPI.delete(RefundRequestAPI.BulkDelete, {
        data: { ticketIds: selected },
      });
      ticketRefecth();
      toast.success("Successfully deleted selected refund requests");
    } catch (error) {
      toast.error("Failed to delete selected refund requests");
    } finally {
      table.toggleAllRowsSelected(false);
    }
  };

  const handleBulkEdit = async (table, status) => {
    const rows = table.getFilteredSelectedRowModel().rows;
    const selected = rows.map((row) => row.original._id);

    try {
      await bulkUpdate({
        ticketIds: selected,
        status,
      });
      ticketRefecth();
      toast.success("Successfully updated selected refund requests");
    } catch (error) {
      toast.error("Failed to update selected refund requests status");
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
      label: "Approved",
      onClick: (table) => handleBulkEdit(table, "Approved"),
    },
    {
      className:
        "w-fit h-9 px-4 bg-red-500 hover:shadow-none hover:opacity-90 font-normal text-white shadow-none duration-300",
      label: "Rejected",
      onClick: (table) => handleBulkEdit(table, "Rejected"),
    },
    {
      className:
        "w-fit h-9 px-4 bg-gray-500 hover:shadow-none hover:opacity-90 font-normal text-white shadow-none duration-300",
      label: "Refunded",
      onClick: (table) => handleBulkEdit(table, "Refunded"),
    },
    {
      className:
        "w-fit h-9 px-4 bg-orange-500 hover:shadow-none hover:opacity-90 font-normal text-white text-nowrap shadow-none duration-300",
      label: "True Refuned",
      onClick: (table) => handleBulkEdit(table, "True Refuned"),
    },
  ];

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
                  actionButtons={actionButtons}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
