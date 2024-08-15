import PaymentGatewayForm from "./components/payment-gateway-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CustomTabs from "@/components/common/custom-tabs";
import { Button } from "@/components/custom/button";
import { PaymentGateWayAPI } from "@/api/endpoints";
import GatewayColumns from "./components/columns";
import Header from "@/components/common/header";
import Loader from "@/components/common/loader";
import { PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import usePost from "@/hooks/use-post";
import useGet from "@/hooks/use-get";
import toast from "react-hot-toast";

export default function PaymentGateWay() {
  const tabsConfig = [
    { value: "All", label: "All" },
    { value: "live", label: "Active" },
    { value: "test", label: "Disabled" },
  ];

  const [activeTab, setActiveTab] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filter = useMemo(() => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    if (activeTab !== "All") params.append("filterStatus", activeTab);
    return params.toString();
  }, [activeTab, limit, page]);

  const {
    isLoading,
    data: { data: { data: gatewayData } = {} } = {},
    refetch: gatewayRefetch,
  } = useGet({
    key: "gatewayData",
    endpoint: PaymentGateWayAPI.GetAll + filter,
  });

  const { mutateAsync: gatewayMutation, isLoading: isCreating } = usePost({
    endpoint: PaymentGateWayAPI.AddGateway,
    isMultiPart: true,
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("status", values.status);
    formData.append("name", values.name);
    formData.append("key", values.key);
    formData.append("saltKey", values.saltKey);

    if (values.icon instanceof File) {
      formData.append("icon", values.icon);
    } else if (typeof values.icon === "string") {
      formData.append("icon", values.icon);
    }

    try {
      const res = await gatewayMutation(formData);
      gatewayRefetch();
      resetForm();
      setIsFormOpen(false);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add new payment gateway"
      );
    }
  };

  return (
    <div>
      <Header title="Payment Gateways"></Header>

      <div className="h-fit w-full relative">
        <Tabs
          orientation="vertical"
          defaultValue={activeTab}
          className="h-full rounded-none"
        >
          <CustomTabs tabs={tabsConfig} setIsActive={setActiveTab} />
          {tabsConfig.map(({ value }) => (
            <TabsContent key={value} value={value}>
              {isLoading ? (
                <Loader />
              ) : (
                <DataTable
                  data={gatewayData?.docs || []}
                  columns={GatewayColumns(gatewayRefetch)}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>

        <PaymentGatewayForm
          open={isFormOpen}
          setOpen={setIsFormOpen}
          trigger={
            <Button className="h-12 flex items-center gap-1.5 absolute top-0 right-0 bg-transparent text-lg text-black hover:text-white shadow-none border-l rounded-none rounded-tr-xl">
              <PlusCircle size={20} /> Add
            </Button>
          }
          onSubmit={handleFormSubmit}
        >
          <DialogFooter className="flex justify-between gap-2 py-5">
            <DialogClose asChild>
              <Button className="h-12 text-lg px-10 bg-white text-black hover:bg-gray-200 border shadow">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="h-12 w-full text-lg"
              disabled={isCreating}
            >
              {isCreating ? "Adding..." : "Add & Save Payment Gateway"}
            </Button>
          </DialogFooter>
        </PaymentGatewayForm>
      </div>
    </div>
  );
}
