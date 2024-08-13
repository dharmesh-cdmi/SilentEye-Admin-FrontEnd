/* eslint-disable react-hooks/rules-of-hooks */
import {
  ActionIcon,
  DiscountIcon,
  EyeIcon,
  IdendityIcon,
  RefundIcons,
} from "@/assets/icons";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/custom/button";
import { useState } from "react";
import DeleteModal from "@/components/common/modals/delet-modal";
import RefundModal from "@/components/common/modals/refund-modal";
import { Plan } from "@/api/endpoints";
import { Switch } from "@/components/ui/switch";
import Spinner from "@/components/common/Spinner";
import useUpdate from "@/hooks/use-update";

export const ProductsColumn = ({ ProductsRefetch }) => {
  return [
    {
      accessorKey: "_id",
      header: () => <div className="flex text-base text-gray-500">Order</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center text-black">
          {row?.id}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: () => (
        <div className="flex lg:w-[700px] w-[100px] items-center gap-2 text-base text-black">
          <IdendityIcon /> Title
        </div>
      ),
      cell: ({ row }) => (
        <div className="lg:w-[700px] w-[100px] font-semibold text-[15px]">{row?.original?.title}</div>
      ),
    },

    {
      accessorKey: "mrp",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <DiscountIcon /> MRP
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-end justify-center text-base text-black font-medium">
            <del className="flex text-xl">
              <span className="opacity-80">$</span>
              <h3 className="text-xl">{row?.original?.mrp}</h3>
              <span className="opacity-80">.00</span>
            </del>
          </div>
        );
      },
    },
    {
      accessorKey: "isLive",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <EyeIcon /> Live
        </div>
      ),
      cell: ({ row }) => {
        const [status, setStatus] = useState(row?.original?.status === "live");

        const { mutateAsync: statusMutation, isLoading: statusLoading } =
          useUpdate({
            isMultiPart: false,
            endpoint: Plan.SinglePlan + row?.original?._id,
          });

        const handleStatus = async (checked) => {
          try {
            setStatus(checked);
            const newStatus = checked ? "live" : "test";
            const payload = {
              ...row?.original,
              status: newStatus,
            };
            const res = await statusMutation(payload);
            if (res?.status === 200) {
              UpsellRefetch();
              toast.success(
                res?.data?.message || "Subscription Status Update Success !"
              );
            }
          } catch (err) {
            console.log(err);
          }
        };
        return (
          <div className="flex justify-center items-center">
            {statusLoading ? (
              <Spinner />
            ) : (
              <Switch
                defaultChecked={status}
                className="data-[state=checked]:bg-[#34C759] "
                onCheckedChange={handleStatus}
              />
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      accessorKey: "Action",
      header: () => (
        <div className="flex items-center justify-end gap-2 text-base text-black">
          <ActionIcon size={22} />
          Action
        </div>
      ),
      cell: ({ row }) => {
        const [open, setOpen] = useState(false);
        const [ropen, setROpen] = useState(false);
        const [id, setId] = useState("");

        return (
          <>
            <div className="flex justify-center items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-lg hover:bg-blue-500 hover:text-white"
                onClick={() => setROpen(true)}
              >
                <RefundIcons size={24} className="" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="rounded-lg hover:bg-red-500 hover:text-white text-red-500"
                onClick={() => {
                  setOpen(true);
                  setId(row.original?._id);
                }}
              >
                <Trash2 className="w-5 h-5 " />
              </Button>
            </div>
            <RefundModal open={ropen} setOpen={setROpen} />
            <DeleteModal
              open={open}
              setOpen={setOpen}
              endpoint={Plan.AllPlans}
              id={id}
              dataRefetch={ProductsRefetch}
            />
          </>
        );
      },
    },
  ];
};
