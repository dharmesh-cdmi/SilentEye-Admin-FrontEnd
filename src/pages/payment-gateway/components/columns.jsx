import {
  ActionIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
  PaymentGateWayIcon
} from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const columns = [
  {
    accessorKey: "gateWayName",
    header: () => (
      <div className="!min-w-full w-full inline-flex items-center gap-2 text-base text-black font-medium">
        <PaymentGateWayIcon />
        Payment Gateways
      </div>
    ),
    cell: ({ row }) => {
      const gateWayName = row.getValue("gateWayName");
      return (
        <div className="flex items-center gap-2.5 text-nowrap text-base text-black font-medium">
          <Package />
          <span>{gateWayName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isLive",
    header: () => (
      <div className="inline-flex items-center gap-2 text-base text-nowrap text-black font-medium">
        <EyeIcon />
        Live
      </div>
    ),
    cell: ({ row }) => {
      let isLive = row.getValue("isLive");
      return (
        <div className="text-base font-medium">
          <Switch className="bg-green-500" checked={isLive} />
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
