/* eslint-disable react-hooks/rules-of-hooks */
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import {
  ActionIcon,
  CreatedIcon,
  DolarIcon,
  EditIcon,
  EmailIcon,
  PersonQuestionMarkIcon,
  PlanIcon,
  PointerIcon,
  TrashIcon,
} from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DeleteModal from "@/components/common/modals/delet-modal";
import { useState } from "react";
import EditRefundForm from "./edit-refund-form";

const statusVariants = (status) => {
  const variants = {
    pending: "bg-yellow-500",
    approved: "bg-green-500",
    rejected: "bg-red-500",
    refunded: "bg-gray-500",
    trueRefunded: "bg-orange-500",
  };
  return variants[status];
};

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => (
      <div className="text-nowrap text-base text-black font-medium opacity-60">
        Index
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-black font-medium text-center text-nowrap opacity-60">
        #{row.getValue("id")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "requestId",
    header: () => (
      <div className="inline-flex items-center gap-2 text-base text-black font-medium opacity-60">
        Req.ID
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-base text-black font-medium opacity-60">
          {row.getValue("requestId")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="inline-flex items-center gap-2 text-base text-black font-medium">
        <PersonQuestionMarkIcon />
        Status
      </div>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="flex justify-center text-nowrap">
          {
            <Badge
              variant="outline"
              className={cn(
                "font-normal text-base text-white capitalize px-3.5 py-1 border-none",
                statusVariants(status)
              )}
            >
              {status}
            </Badge>
          }
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="inline-flex items-center gap-2 text-base text-black font-medium">
        <EmailIcon />
        Email
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-nowrap text-base text-black font-medium">
          {row.getValue("email")}
        </div>
      );
    },
  },
  {
    accessorKey: "plan",
    header: () => (
      <div className="inline-flex items-center gap-2 text-base text-black font-medium">
        <PlanIcon />
        Plan
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-base text-black font-medium">
          {row.getValue("plan")}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="inline-flex items-center gap-2 text-base text-black font-medium">
        <DolarIcon />
        Amount
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-end text-base text-black font-medium">
          <span>$</span>
          <h3 className="text-xl">{row.getValue("amount")}</h3>
          <span>.00</span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: () => (
      <div className="inline-flex items-center gap-2 text-base text-black font-medium">
        <PointerIcon />
        Type
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-start text-nowrap text-base text-black font-medium">
          <Badge className={cn("text-base font-normal bg-gray-500")}>
            {row.getValue("type")}
          </Badge>
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
        <div className="max-w-40 truncate sm:max-w-72 md:max-w-[31rem] text-base text-black font-medium">
          {row.getValue("createdAt")}
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
    cell: () => {
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

      return (
        <>
          <div className="flex justify-center gap-1.5">
            <EditRefundForm>
              <Button className="h-9 w-9 p-1.5 bg-white text-black hover:bg-blue-600 hover:text-white border rounded-lg shadow-md duration-200">
                <EditIcon />
              </Button>
            </EditRefundForm>

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
