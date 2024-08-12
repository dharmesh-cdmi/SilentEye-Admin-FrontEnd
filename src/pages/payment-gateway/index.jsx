import { CircleDollarSign, PlusCircle } from "lucide-react";
import PaymentGatewayForm from "./components/payment-gateway-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import CustomTabs from "@/components/common/custom-tabs";
import { Button } from "@/components/custom/button";
import Header from "@/components/common/header";
import GatewayColumns from "./components/columns";
import useGet from "@/hooks/use-get";
import { PaymentGateWayAPI } from "@/api/endpoints";
import { useMemo, useState } from "react";
import Loader from "@/components/common/loader";
import usePost from "@/hooks/use-post";

export default function PaymentGateWay() {
  const tabsConfig = [
    { value: "All", icon: CircleDollarSign, label: "All" },
    { value: "live", icon: OrdersIcon, label: "Active" },
    { value: "test", icon: RefundIcons, label: "Disabled" },
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

    await gatewayMutation(formData);
    gatewayRefetch();
    resetForm();
    setIsFormOpen(false);
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
