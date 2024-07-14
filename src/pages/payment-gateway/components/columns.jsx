/* eslint-disable react-hooks/rules-of-hooks */
import {
  ActionIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
  PaymentGateWayIcon,
} from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import DeleteModal from "@/components/common/modals/delet-modal";
import PaymentGatewayForm from "./payment-gateway-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

export const columns = [
  {
    accessorKey: "name",
    header: () => (
      <div className="!min-w-full w-full inline-flex items-center gap-2 text-base text-black font-medium">
        <PaymentGateWayIcon />
        Payment Gateways
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2.5 text-nowrap text-base text-black font-medium">
          <Package />
          <span>{row.getValue("name")}</span>
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
      const status = row.getValue("status");
      const isLive = status === "live";
      return (
        <div className="text-base font-medium">
          <Switch
            className="data-[state=checked]:bg-[#34C759]"
            defaultChecked={isLive}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="max-w-fit inline-flex items-center justify-end gap-2 text-base text-black font-medium">
        <ActionIcon />
        Action
      </div>
    ),
    cell: ({ row }) => {
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      return (
        <>
          <div className="flex justify-center gap-1.5">
            <PaymentGatewayForm
              initialValues={row.original}
              trigger={
                <Button className="h-9 w-9 p-1.5 bg-white text-black hover:bg-blue-600 hover:text-white border rounded-lg shadow-md duration-200">
                  <EditIcon />
                </Button>
              }
              onSubmit={(data) => console.log(data)}
            >
              <DialogFooter className="flex justify-between gap-2 py-5">
                <DialogClose asChild>
                  <Button className="h-12 text-lg px-10 bg-white text-black hover:bg-gray-200 border shadow">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="h-12 w-full text-lg">
                  Add & Save Payment Gateway
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
            setOpen={setIsDeleteModalOpen}
          />
        </>
      );
    },
  },
];
