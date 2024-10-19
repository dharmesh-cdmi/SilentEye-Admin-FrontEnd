/* eslint-disable react-hooks/rules-of-hooks */
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import {
  ActionIcon,
  CreatedIcon,
  DolarIcon,
  EditIcon,
  EmailIcon,
  MessageIcon,
  PersonQuestionMarkIcon,
  PlanIcon,
  PlanStandardIcon,
  PointerIcon,
  TrashIcon,
} from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { cn, formatDateTime } from "@/lib/utils";
import DeleteModal from "@/components/common/modals/delet-modal";
import { useState } from "react";
import EditRefundForm from "./edit-refund-form";
import { RefundRequestAPI } from "@/api/endpoints";

const statusVariants = (status) => {
  const variants = {
    Pending: "bg-yellow-500",
    Approved: "bg-green-500",
    Rejected: "bg-red-500",
    Refunded: "bg-gray-500",
    "True Refunded": "bg-orange-500",
  };
  return variants[status];
};

export default function RefundColumns(refundRefecth) {
  return [
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
    },
    {
      accessorKey: "index",
      header: () => (
        <div className="text-nowrap text-base text-black font-medium opacity-60">
          Index
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-base text-black font-normal text-center text-nowrap opacity-60">
          #{row.getValue("index")}
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
          <div className="text-base text-black font-normal opacity-60">
            #{row.getValue("requestId")}
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
          <div className="text-nowrap text-base text-black font-normal">
            {row.getValue("email")}
          </div>
        );
      },
    },
    {
      accessorKey: "planId",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-black font-medium">
          <PlanIcon className="fill-none" />
          Plan
        </div>
      ),
      cell: ({ row }) => {
        const plan = row.original?.plan?.name;
        const IconPlan = plan === "Standard" ? PlanStandardIcon : PlanIcon;

        return (
          <div className="flex items-center gap-2 text-base text-black font-normal">
            {plan ? (
              <>
                <IconPlan size={20} className="fill-none" />
                {plan}
              </>
            ) : (
              "-"
            )}
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
          <div className="flex items-end gap-0.5 text-base text-black font-normal">
            <span>$</span>
            <h3 className="text-xl">
              {row.original?.plan?.amount
                ? Math.round(row.original.plan.amount)
                : "00"}
            </h3>
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
            {row.original.type ? (
              <Badge
                variant="outline"
                className="font-normal text-base shadow-md"
              >
                {row.original.type}
              </Badge>
            ) : (
              <p className="w-full text-center">-</p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "reason",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-nowrap text-black">
          <MessageIcon />
          Reason
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="w-56 line-clamp-2 font-normal text-base text-black">
            {row.original.reason || "-"}
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
          <div className="text-nowrap text-base text-black font-normal">
            {formatDateTime(row.original.createdAt)}
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
              <EditRefundForm
                initialValues={row.original}
                dataRefetch={refundRefecth}
              >
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
              endpoint={RefundRequestAPI.DeleteRefund}
              id={row.original._id}
              msg="Refund Request Deleted Successfully !"
              dataRefetch={refundRefecth}
            />
          </>
        );
      },
    },
  ];
}
