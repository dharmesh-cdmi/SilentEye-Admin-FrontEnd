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
            {row.getValue("createdAt")}
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
        const validity = row.getValue("validity");
        return (
          <div className="text-nowrap text-black text-base font-medium">
            {validity || "No limit"}
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
            {row.getValue("useLimit")}
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
        const isLive = row.original.status === "test" ? false : true;

        const handleStatusChange = async (updatedIsLive) => {
          try {
            const res = await discountMutateAsync({
              status: updatedIsLive ? "live" : "test",
            });
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        };

        return (
          <div className="text-base font-medium">
            <Switch
              className="data-[state=checked]:bg-[#34C759]"
              defaultChecked={isLive}
              onCheckedChange={handleStatusChange}
            />
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
        return (
          <>
            <div className="flex justify-center gap-1.5">
              <CouponForm initialValues={row.original}>
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
