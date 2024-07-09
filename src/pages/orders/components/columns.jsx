/* eslint-disable react-hooks/rules-of-hooks */
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";

import { labels, priorities, statuses } from "../data/data";
import { RefundIcons, WebIcon } from "@/assets/icons";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/custom/button";
import { useState } from "react";
import DeleteModal from "@/components/common/modals/delet-modal";
import RefundModal from "@/components/common/modals/refund-modal";
import { RightDrawer } from "@/components/common/drawers/common-right-drawer";

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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: () => (
      <div className="flex space-x-2 px-2">
        <WebIcon size={19} />{" "}
        <p className="text-[17px] text-primary">Country</p>
      </div>
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {/* {row.getValue("title")} */}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    accessorKey: "Action",
    header: () => (
      <div className="flex space-x-2 px-2 w-[40px]">
        <WebIcon size={19} /> <p className="text-[17px] text-primary">Action</p>
      </div>
    ),

    // eslint-disable-next-line no-unused-vars
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [ropen, setROpen] = useState(false);
      const [dopen, setDOpen] = useState(false);

      return (
        <>
          <div className="flex space-x-2 justify-center">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-lg"
              onClick={() => setROpen(true)}
            >
              <RefundIcons size={20} />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="rounded-lg"
              onClick={() => setOpen(true)}
            >
              <Trash2 className="w-5 h-5 text-red-400 hover:text-red-600" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-lg"
              onClick={() => setDOpen(true)}
            >
              <Trash2 className="w-5 h-5 text-red-400 hover:text-red-600" />
            </Button>
          </div>
          <RefundModal open={ropen} setOpen={setROpen} />
          <DeleteModal open={open} setOpen={setOpen} />
          <RightDrawer open={dopen} setOpen={setDOpen} />
        </>
      );
    },
  },
];
