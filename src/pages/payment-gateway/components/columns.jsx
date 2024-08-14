/* eslint-disable react-hooks/rules-of-hooks */
import {
  ActionIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
  PaymentGateWayIcon,
} from "@/assets/icons";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import DeleteModal from "@/components/common/modals/delet-modal";
import PaymentGatewayForm from "./payment-gateway-form";
import { PaymentGateWayAPI, PROD_IMG_Prefix } from "@/api/endpoints";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import useUpdate from "@/hooks/use-update";
import { useState } from "react";
import toast from "react-hot-toast";

export default function GatewayColumns(refetchData) {
  return [
    {
      accessorKey: "name",
      header: () => (
        <div className="min-w-fit w-full flex flex-nowrap text-nowrap items-center gap-2 text-base text-black font-medium">
          <PaymentGateWayIcon className="fill-none" />
          Payment Gateways
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2.5 text-nowrap text-base text-black font-medium">
            <img
              className="h-9 w-auto"
              src={PROD_IMG_Prefix + row.original.icon}
            />
            <span>{row.getValue("name")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="flex items-center justify-end gap-2 text-base text-nowrap text-black font-medium">
          <EyeIcon />
          Live
        </div>
      ),
      cell: ({ row }) => {
        const [isLive, setIsLive] = useState(
          row.original.status === "test" ? false : true
        );

        const {
          mutateAsync: gatewaytMutateAsync,
          isLoading: gatewayStatusChanging,
        } = useUpdate({
          isMultiPart: false,
          endpoint: PaymentGateWayAPI.Update + row.original._id,
        });

        const handleStatusChange = async (updatedIsLive) => {
          setIsLive((prev) => !prev);
          try {
            const { data } = await gatewaytMutateAsync({
              status: updatedIsLive ? "live" : "test",
            });
            setIsLive(updatedIsLive);
            toast.success(data.message);
          } catch (error) {
            setIsLive(row.original.status === "test" ? false : true);
          }
        };

        return (
          <div className="flex justify-end text-base font-medium">
            {gatewayStatusChanging ? (
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
        <div className="flex items-center justify-end gap-2 text-base text-black font-medium">
          <ActionIcon />
          Action
        </div>
      ),
      cell: ({ row }) => {
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
        const [isEditModalOpen, setIsEditModalOpen] = useState(false);

        const { mutateAsync: gatewayMutation, isLoading: isUpdating } =
          useUpdate({
            endpoint: PaymentGateWayAPI.Update + row.original._id,
            isMultiPart: true,
          });

        const handleUpdate = async (values) => {
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
            refetchData();
            setIsEditModalOpen(false);
            toast.success(res.data.message);
          } catch (error) {
            toast.error(error.response?.data?.message || error.message);
          }
        };

        return (
          <>
            <div className="flex justify-end gap-1.5">
              <PaymentGatewayForm
                open={isEditModalOpen}
                setOpen={setIsEditModalOpen}
                initialValues={row.original}
                trigger={
                  <Button className="h-9 w-9 p-1.5 bg-white text-black hover:bg-blue-600 hover:text-white border rounded-lg shadow-md duration-200">
                    <EditIcon />
                  </Button>
                }
                onSubmit={handleUpdate}
              >
                <DialogFooter className="flex justify-between gap-2 py-5">
                  <DialogClose asChild>
                    <Button className="h-12 text-lg px-10 bg-white text-black hover:bg-gray-200 border shadow">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="h-12 w-full text-lg"
                  >
                    {isUpdating ? "Saving..." : "Add & Save Payment Gateway"}
                  </Button>
                </DialogFooter>
              </PaymentGatewayForm>
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                className="h-9 w-9 p-1.5 bg-white text-rose-500 hover:bg-rose-600 hover:text-white border rounded-lg shadow-md duration-200"
              >
                <TrashIcon />
              </Button>
            </div>
            <DeleteModal
              open={isDeleteModalOpen}
              dataRefetch={refetchData}
              endpoint={PaymentGateWayAPI.Delete}
              id={row.original._id}
              setOpen={setIsDeleteModalOpen}
            />
          </>
        );
      },
    },
  ];
}
