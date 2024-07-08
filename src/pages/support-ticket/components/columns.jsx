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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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
    accessorKey: "ticketId",
    header: () => (
      <div className="inline-flex items-center gap-2 text-base text-nowrap text-black font-medium opacity-60">
        Ticket ID
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-base text-black font-medium opacity-60">
          #{row.getValue("ticketId")}
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
            <Badge variant="outline" className="text-base">
              {row.getValue("status")}
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
          {row.getValue("email")}
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
          <Badge variant="outline" className="text-base">
            {row.getValue("type")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "message",
    header: () => (
      <div className="inline-flex items-center gap-2 text-base text-black font-medium">
        <MessageIcon />
        Message
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-40 sm:max-w-72 md:max-w-[31rem] truncate text-base text-black font-medium">
          {row.getValue("message")}
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
    accessorKey: "lastReply",
    header: () => (
      <div className="inline-flex items-center gap-2 text-base text-nowrap text-black font-medium">
        <MessageIcon />
        Last Reply
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-40 sm:max-w-72 md:max-w-[31rem] truncate text-base text-black font-medium">
          {row.getValue("lastReply")}
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
    cell: () => (
      <div className="flex justify-center gap-1.5">
        <Button className="h-9 w-9 p-1.5 bg-white text-black hover:bg-blue-600 hover:text-white border rounded-lg shadow-md duration-200">
          <EditIcon />
        </Button>
        <Button className="h-9 w-9 p-1.5 bg-white text-rose-500 hover:bg-rose-600 hover:text-white border rounded-lg shadow-md duration-200">
          <TrashIcon />
        </Button>
      </div>
    ),
  },
];
