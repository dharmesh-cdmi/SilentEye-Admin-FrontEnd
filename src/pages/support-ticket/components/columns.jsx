/* eslint-disable react-hooks/rules-of-hooks */
import {
  ActionIcon,
  CreatedIcon,
  EditIcon,
  EmailIcon,
  MessageIcon,
  PersonQuestionMarkIcon,
  PointerIcon,
  TrashIcon,
} from "@/assets/icons";
import DeleteModal from "@/components/common/modals/delet-modal";
import { Checkbox } from "@/components/ui/checkbox";
import { SupportTicketAPI } from "@/api/endpoints";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatDateTime } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";

const statusColor = {
  Active: "bg-green-500",
  Pending: "bg-orange-400",
  Answered: "bg-blue-600",
  Closed: "bg-gray-500",
};

export default function TicketColumns(ticketRefecth) {
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
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "index",
      header: () => (
        <div className="text-nowrap text-base text-black font-medium opacity-60">
          Index
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-black font-medium text-center text-nowrap opacity-60">
          #{row.original.index}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "ticketId",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-nowrap text-black font-medium opacity-60">
          Ticket ID
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-base text-black font-medium opacity-60">
            #{row.original.ticketId}
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
        return (
          <div className="flex justify-center text-nowrap">
            {
              <Badge
                variant="outline"
                className={cn(
                  "font-normal text-base text-white",
                  statusColor[row.original.status]
                )}
              >
                {row.original.status}
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
          <div className="flex space-x-2 text-base text-nowrap">
            {row.original?.user?.email}
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
            <Badge
              variant="outline"
              className="font-normal text-base shadow-md"
            >
              {row.original.type}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "message",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-black">
          <MessageIcon />
          Message
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="max-w-40 sm:max-w-72 md:max-w-[31rem] truncate font-normal text-base text-black">
            {row.original.message}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-black">
          <CreatedIcon />
          Created
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="max-w-40 truncate sm:max-w-72 md:max-w-[31rem] font-normal text-base text-black">
            {formatDateTime(row.original.createdAt)}
          </div>
        );
      },
    },
    {
      accessorKey: "lastReply",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-nowrap text-black">
          <MessageIcon />
          Last Reply
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="max-w-40 sm:max-w-72 md:max-w-[31rem] truncate font-normal text-base text-black">
            {row.original.lastReply || "-"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="inline-flex items-center justify-end gap-2 text-base text-black">
          <ActionIcon size={20} />
          Action
        </div>
      ),
      cell: ({ row }) => {
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

        return (
          <>
            <div className="flex justify-center gap-1.5">
              <Link
                to={`${row.original._id}`}
                className="h-9 w-9 p-1.5 bg-white text-black hover:bg-blue-600 hover:text-white border rounded-lg shadow-md duration-200"
              >
                <EditIcon />
              </Link>
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                className="h-9 w-9 p-1.5 bg-white text-rose-500 hover:bg-rose-600 hover:text-white border rounded-lg shadow-md duration-200"
              >
                <TrashIcon />
              </Button>
            </div>

            <DeleteModal
              open={isDeleteModalOpen}
              endpoint={SupportTicketAPI.AllData}
              id={row.original._id}
              dataRefetch={ticketRefecth}
              setOpen={setIsDeleteModalOpen}
            />
          </>
        );
      },
    },
  ];
}
