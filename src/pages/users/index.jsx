import { useEffect, useMemo, useState } from "react";
import { Download, UserX } from "lucide-react";
import Loader from "@/components/common/loader";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import CommonSearch from "@/components/ui/search";
import Header from "@/components/common/header";
import CommonButton from "@/components/ui/common-button";
import Country from "@/components/common/country";
import useGet from "@/hooks/use-get";
import CustomTabs from "@/components/common/custom-tabs";
import { DataTable } from "@/components/common/Table/data-table";
import { DefaultColumn } from "./components/defaultColumn";
import { UserAPI } from "@/api/endpoints";
import { fileDownload } from "@/lib/utils";
import Filter from "./components/filter";
import useUpdate from "@/hooks/use-update";
import { TrashIcon } from "@/assets/icons";
import toast from "react-hot-toast";
import adminAPI from "@/api/adminAPI";
import LimitSelector from "@/components/common/limit-selector";
import { formatDate } from "@/utils/dateConfig";

export default function Users() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "all", label: "All" },
    { value: "Demo", label: "Demo" },
    { value: "Checkout", label: "Checkout" },
    { value: "Paymentinitiat", label: "Payment Initiated" },
    { value: "Paid", label: "Paid" },
    { value: "Purchased", label: "Purchased" },
    { value: "Loggedin", label: "Logged In" },
    { value: "Refund", label: "Refund Requested" },
    { value: "Blocked", label: "Blocked" },
  ];

  const [isActive, setIsActive] = useState("all");
  const [searchTerm, setSearchTerm] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [statusSelected, setStatusSelected] = useState([]);
  const [processSelected, setProcessSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filter = useMemo(() => {
    const params = new URLSearchParams();

    if (statusSelected && statusSelected.length > 0) {
      params.append("userStatus", statusSelected);
    } else if (isActive !== "all") {
      params.append("userStatus", isActive);
    }
    if (searchTerm) {
      params.append("searchQuery", searchTerm);
    }
    if (selectedCountries && selectedCountries.length > 0) {
      params.append("country", selectedCountries.join(","));
    }
    if (dateRange?.start) {
      params.append("fromDate", formatDate(dateRange.start));
    }
    if (dateRange?.end) {
      params.append("toDate", formatDate(dateRange.end));
    }
    if (processSelected && processSelected.length > 0) {
      params.append("process", processSelected);
    }

    params.append("limit", limit);
    params.append("pageIndex", currentPage);

    return params.toString(); // Converts to a query string
  }, [
    statusSelected,
    isActive,
    searchTerm,
    selectedCountries,
    dateRange.start,
    dateRange.end,
    processSelected,
    limit,
    currentPage,
  ]);

  const {
    data: { data: { data: usersData } = {} } = {},
    isLoading: usersLoading,
    refetch: UserRefetch,
  } = useGet({
    key: "usersData",
    endpoint: `${UserAPI.AllUsers}/?${filter}`,
  });

  useEffect(() => {
    UserRefetch();
  }, [filter, UserRefetch]);

  const handleDateRangeUpdate = (range) => {
    setDateRange(range);
  };

  const handleDownload = async () => {
    await fileDownload(UserAPI.DownloadUser);
  };

  const { mutateAsync: bulkUpdate } = useUpdate({
    endpoint: UserAPI.BulkUpdate,
    isMultiPart: false,
  });

  const handleBulkDelete = async (table) => {
    const rows = table.getFilteredSelectedRowModel().rows;
    const selected = rows.map((row) => row.original._id);
    try {
      await adminAPI.delete(UserAPI.BulkDelete, {
        data: { usersIds: selected },
      });
      UserRefetch();
      toast.success("Successfully deleted selected users");
    } catch (error) {
      toast.error("Failed to delete selected users");
    } finally {
      table.toggleAllRowsSelected(false);
    }
  };

  const handleBulkEdit = async (table, status) => {
    const rows = table.getFilteredSelectedRowModel().rows;
    const selected = rows.map((row) => row.original._id);

    try {
      await bulkUpdate({
        usersIds: selected,
        status,
      });
      UserRefetch();
      toast.success("Successfully updated selected tickets status");
    } catch (error) {
      toast.error("Failed to update selected tickets status");
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
        "w-fit h-9 px-4 hover:shadow-none hover:opacity-90 font-normal text-black shadow-none duration-300",
      icon: UserX,
      label: "Blocked",
      onClick: (table) => handleBulkEdit(table, "Closed"),
    },
  ];
  useEffect(() => {
    if (statusSelected.length > 0) {
      setIsActive(statusSelected[0]);
    }
  }, [statusSelected]);

  return (
    <div>
      {usersLoading || !isActive ? (
        <Loader />
      ) : (
        <>
          <Header title="Users" className=" ">
            <CommonSearch onSearch={setSearchTerm} />

            <div className="flex gap-3">
              <Country
                selectedCountries={selectedCountries}
                setSelectedCountries={setSelectedCountries}
              />
              <DateRangePicker onUpdate={handleDateRangeUpdate} />
              <Filter
                statusSelected={statusSelected}
                setStatusSelected={setStatusSelected}
                processSelected={processSelected}
                setProcessSelected={setProcessSelected}
              />
              <LimitSelector limit={limit} setLimit={setLimit} />
              <CommonButton onClick={handleDownload}>
                <Download className="w-6 h-6" />
              </CommonButton>
            </div>
          </Header>

          <div className="w-full">
            <Tabs // This is Shadcn Tabs
              orientation="vertical"
              defaultValue={isActive}
            >
              {/* This is Common TabsListCompnent  */}
              <CustomTabs tabs={tabsConfig} setIsActive={setIsActive} />
              {tabsConfig?.map((item, id) => (
                <TabsContent value={item?.value} className="" key={id}>
                  <DataTable
                    data={usersData?.users || []}
                    columns={DefaultColumn({
                      tabKey: isActive,
                      UserRefetch: UserRefetch,
                    })}
                    actionButtons={actionButtons}
                    pagination={{
                      limit,
                      setLimit,
                      currentPage,
                      setCurrentPage,
                      totalData: usersData?.totalUsers,
                    }}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
}
