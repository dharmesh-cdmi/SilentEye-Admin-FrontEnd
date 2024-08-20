import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CustomTabs from "@/components/common/custom-tabs";
import { Button } from "@/components/custom/button";
import DiscountColumns from "./components/columns";
import CouponForm from "./components/coupon-form";
import Header from "@/components/common/header";
import Loader from "@/components/common/loader";
import { DiscountAPI } from "@/api/endpoints";
import { PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import usePost from "@/hooks/use-post";
import toast from "react-hot-toast";
import useGet from "@/hooks/use-get";
import LimitSelector from "@/components/common/limit-selector";

export default function Discount() {
  const tabsConfig = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "expired", label: "Expired" },
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filter = useMemo(() => {
    const params = new URLSearchParams();
    if (activeTab !== "all") {
      params.append("filterValidity", activeTab);
    }
    params.append("limit", limit);
    return params.toString();
  }, [activeTab, limit]);

  const {
    isLoading,
    data: { data: { data: discountData } = {} } = {},
    refetch: discountRefetch,
  } = useGet({
    key: "discountData",
    endpoint: `${DiscountAPI.GetAll}?${filter}`,
  });

  const { mutateAsync: addDiscountMutation } = usePost({
    endpoint: DiscountAPI.GetAll,
    isMultiPart: false,
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    const validity = values.validityDate
      ? new Date(`${values.validityDate}T${values.validityTime}`).toISOString()
      : "No Limit";

    try {
      const res = await addDiscountMutation({
        coupon: values.coupon,
        discountPercent: values.discountPercent,
        useLimit: values.useLimit,
        status: "test",
        validity,
      });

      discountRefetch();
      resetForm();
      setIsFormOpen(false);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add new discount"
      );
    }
  };

  return (
    <div>
      <Header title="Discount">
        <LimitSelector limit={limit} setLimit={setLimit} />
      </Header>

      <div className="h-fit w-full relative">
        <Tabs
          orientation="vertical"
          defaultValue={activeTab}
          className="h-full rounded-none"
        >
          <CustomTabs setIsActive={setActiveTab} tabs={tabsConfig} />

          {tabsConfig.map(({ value }) => (
            <TabsContent key={value} value={value}>
              {isLoading ? (
                <Loader />
              ) : (
                <DataTable
                  data={discountData?.docs || []}
                  columns={DiscountColumns(discountRefetch)}
                  pagination={{
                    limit,
                    setLimit,
                    currentPage,
                    setCurrentPage,
                    totalData: discountData?.totalDocs,
                  }}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>

        <CouponForm
          open={isFormOpen}
          setOpen={setIsFormOpen}
          onSubmit={handleFormSubmit}
        >
          <Button className="h-12 flex items-center gap-1.5 absolute top-0 right-0 bg-transparent text-lg text-black hover:text-white shadow-none border-l rounded-none rounded-tr-xl">
            <PlusCircle size={20} /> Add Coupon
          </Button>
        </CouponForm>
      </div>
    </div>
  );
}
