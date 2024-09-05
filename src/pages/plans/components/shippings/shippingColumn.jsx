/* eslint-disable react-hooks/rules-of-hooks */
import {
  ActionIcon,
  AmountIcon,
  EyeIcon,
  IdendityIcon,
} from "@/assets/icons";
import { Edit, NotepadText, Plane, Trash2 } from "lucide-react";
import { Button } from "@/components/custom/button";
import { useState } from "react";
import DeleteModal from "@/components/common/modals/delet-modal";
import { Shipping } from "@/api/endpoints";
import { Switch } from "@/components/ui/switch";
import useUpdate from "@/hooks/use-update";
import toast from "react-hot-toast";
import CommonModal from "@/components/common/modals/common-modal";
import AddShipping from "./AddShipping";

export const ShippingColumn = ({ ShippingRefetch }) => {
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
        <div className="flex lg:w-[500px] w-[100px] items-center gap-2 text-base text-black">
          <IdendityIcon /> Title
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-semibold lg:w-[500px] w-[100px] text-[15px]">
          {row?.original?.title}
        </div>
      ),
    },
    {
      accessorKey: "days",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <NotepadText /> Days
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-base text-black">{row?.original?.daysRange}</div>
        );
      },
    },
    {
      accessorKey: "price",
      header: () => (
        <div className="flex justify-start items-center gap-2 text-base text-black">
          <AmountIcon size={19} className="fill-white" />
          Price
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex text-xl items-center justify-start  text-black font-medium">
          <span className="opacity-80">$</span>
          <h3 className="text-xl">{row?.original?.price}</h3>
          <span className="opacity-80">.00</span>
        </div>
      ),
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

        const { mutateAsync: statusMutation } = useUpdate({
          isMultiPart: false,
          endpoint: Shipping.UpdateShipping + row?.original?._id,
        });

        const handleStatus = async (checked) => {
          try {
            const newStatus = checked ? "live" : "test";
            const payload = {
              ...row?.original,
              status: newStatus,
            };
            const res = await statusMutation(payload);
            if (res?.status === 200) {
              setStatus(checked);
              // ShippingRefetch();
              toast.success(
                res?.data?.message || "Subscription Status Update Success !"
              );
            }
          } catch (err) {
            console.error(err);
          }
        };
        return (
          <div className="flex justify-center items-center">
            <Switch
              defaultChecked={status}
              className="data-[state=checked]:bg-[#34C759] "
              onCheckedChange={handleStatus}
            />
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
                <Edit size={19} className="" />
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
            <CommonModal
              open={ropen}
              setOpen={setROpen}
              title={
                <div className="flex space-x-3 items-center">
                  <Plane /> <h2>Add New Shipping</h2>
                </div>
              }
            >
              <AddShipping
                setOpen={setROpen}
                Refetch={ShippingRefetch}
                data={row?.original}
              />
            </CommonModal>

            <DeleteModal
              open={open}
              setOpen={setOpen}
              endpoint={Shipping.AllShipping}
              id={id}
              dataRefetch={ShippingRefetch}
            />
          </>
        );
      },
    },
  ];
};
