/* eslint-disable react-hooks/rules-of-hooks */
import {
  ActionIcon,
  CouponIcon,
  CreatedIcon,
  DiscountIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
  UsedCouponLimitIcon,
  UseLimitIcon,
  ValidityIcon,
} from "@/assets/icons";
import DeleteModal from "@/components/common/modals/delet-modal";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DiscountAPI } from "@/api/endpoints";
import CouponForm from "./coupon-form";
import { useState } from "react";
import useUpdate from "@/hooks/use-update";
import { formatDateTime } from "@/lib/utils";
import toast from "react-hot-toast";

export default function DiscountColumns(discountRefetch) {
  return [
    {
      accessorKey: "coupon",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-black font-medium">
          <CouponIcon />
          Coupon
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-base text-nowrap uppercase">
            {row.getValue("coupon")}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-black font-medium">
          <CreatedIcon />
          Created
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-nowrap text-base text-black font-medium">
            {formatDateTime(row.original.createdAt)}
          </div>
        );
      },
    },
    {
      accessorKey: "validity",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-black font-medium">
          <ValidityIcon />
          Validity
        </div>
      ),
      cell: ({ row }) => {
        const isValidity = row.original.validity !== "No Limit";
        return (
          <div className="text-nowrap text-black text-base font-medium">
            {isValidity ? formatDateTime(row.original.validity) : "No limit"}
          </div>
        );
      },
    },
    {
      accessorKey: "useLimit",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-nowrap text-black font-medium">
          <UseLimitIcon />
          Use Limit
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-base text-black font-medium">
            {row.original.useLimit || "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "discountPercent",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-nowrap text-black font-medium">
          <DiscountIcon />
          Discount
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-end gap-1 text-base text-rose-500 font-medium">
            <h3 className="text-xl">{row.getValue("discountPercent")}%</h3>
            <p className="opacity-80">off</p>
          </div>
        );
      },
    },
    {
      accessorKey: "used",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-nowrap text-black font-medium">
          <UsedCouponLimitIcon />
          Used
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-base text-black font-medium">
            {row.getValue("used")}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-nowrap text-black font-medium">
          <EyeIcon />
          Live
        </div>
      ),
      cell: ({ row }) => {
        const [isLive, setIsLive] = useState(
          row.original.status === "test" ? false : true
        );

        const {
          mutateAsync: discountMutateAsync,
          isLoading: discountStatusChanging,
        } = useUpdate({
          isMultiPart: false,
          endpoint: DiscountAPI.ChangeStatus + row.original._id,
        });

        const handleStatusChange = async (updatedIsLive) => {
          setIsLive((prev) => !prev);
          try {
            const res = await discountMutateAsync({
              status: updatedIsLive ? "live" : "test",
            });
            setIsLive(updatedIsLive);
            toast.success(res.data.message);
          } catch (error) {
            setIsLive(row.original.status === "test" ? false : true);
            toast.success(error.response?.data?.message || error.message);
          }
        };

        return (
          <div className="text-base font-medium">
            {discountStatusChanging ? (
              "Loading.."
            ) : (
              <Switch
                className="data-[state=checked]:bg-[#34C759]"
                defaultChecked={isLive}
                checked={isLive}
                onCheckedChange={handleStatusChange}
              />
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="inline-flex items-center justify-end gap-2 text-base text-black font-medium">
          <ActionIcon />
          Action
        </div>
      ),
      cell: ({ row }) => {
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
        const [isEditModalOpen, setIsEditModalOpen] = useState(false);

        const { mutateAsync: updateDiscountMutation } = useUpdate({
          endpoint: DiscountAPI.ChangeStatus + row.original._id,
        });

        const handleUpdate = async (values) => {
          const validity = values.isValidity
            ? new Date(
                `${values.validityDate}T${values.validityTime}`
              ).toISOString()
            : "No Limit";

          try {
            const res = await updateDiscountMutation({
              coupon: values.coupon,
              discountPercent: values.discountPercent,
              useLimit: values.useLimit,
              status: values.status,
              validity,
            });

            toast.success(res.data.message);
            discountRefetch();
            setIsEditModalOpen(false);
          } catch (error) {
            toast.error(error.response?.data?.message || error.message);
          }
        };

        return (
          <>
            <div className="flex justify-center gap-1.5">
              <CouponForm
                open={isEditModalOpen}
                setOpen={setIsEditModalOpen}
                initialValues={row.original}
                onSubmit={handleUpdate}
              >
                <Button className="h-9 w-9 p-1.5 bg-white text-black hover:bg-blue-600 hover:text-white border rounded-lg shadow-md duration-200">
                  <EditIcon />
                </Button>
              </CouponForm>

              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                className="h-9 w-9 p-1.5 bg-white text-rose-500 hover:bg-rose-600 hover:text-white border rounded-lg shadow-md duration-200"
              >
                <TrashIcon />
              </Button>
            </div>

            <DeleteModal
              open={isDeleteModalOpen}
              endpoint={DiscountAPI.DeleteDiscount}
              id={row.original._id}
              dataRefetch={discountRefetch}
              setOpen={setIsDeleteModalOpen}
            />
          </>
        );
      },
    },
  ];
}
