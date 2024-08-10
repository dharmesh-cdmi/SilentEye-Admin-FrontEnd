/* eslint-disable react-hooks/rules-of-hooks */
import {
  AmountIcon,
  AndroidIcon,
  BagIcon,
  IosIcon,
  PaymentGateWayIcon,
  PlanIcon,
  RefundIcon,
  UseLimitIcon,
  WebIcon,
} from "@/assets/icons";
import { CircleUser, Laptop2Icon, Users } from "lucide-react";
import { useState } from "react";
import { UserAPI } from "@/api/endpoints";

import { Switch } from "@/components/ui/switch";
import useUpdate from "@/hooks/use-update";
import toast from "react-hot-toast";
import Spinner from "@/components/common/Spinner";

export const CountryColumn = () => {
  const columns = [
    {
      accessorKey: "_id",
      header: () => (
        <div className="flex space-x-2 px-2 w-12">
          <p className="text-[17px] text-gray-500">Index</p>
        </div>
      ),
      cell: ({ row }) => (
        <div className="items-center flex justify-center text-gray-500">
          # {row?.id}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "country",
      header: () => (
        <div className="flex justify-center space-x-2 px-2">
          <WebIcon size={19} />{" "}
          <p className="text-[17px] text-primary">Country</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            {row?.original?.country}
          </div>
        );
      },
    },
    {
      accessorKey: "amountspend",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <AmountIcon size={36} />{" "}
          <p className="text-[17px] text-primary">Amound Spend</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            {row?.original?.amountSpend}
          </div>
        );
      },
    },
    {
      accessorKey: "allusers",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <Users size={36} />{" "}
          <p className="text-[17px] text-primary">All Users</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            {row?.original?.amountRefund}
          </div>
        );
      },
    },

    {
      accessorKey: "sales",
      header: () => (
        <div className="flex space-x-2 px-2 justify-start">
          <BagIcon size={19} />{" "}
          <p className="text-[17px] text-primary">Sales</p>
        </div>
      ),
      cell: ({ row }) => {
        // Example usage
        // const deviceType = getDeviceType(row?.original?.device);

        return (
          <div className="flex justify-start items-center space-x-2 w-[120px]">
            {row?.original?.device && row?.original?.deviceType === "ios" ? (
              <IosIcon size={20} />
            ) : row?.original?.deviceType === "android" ? (
              <AndroidIcon size={20} />
            ) : row?.original?.deviceType === "laptop" ? (
              <Laptop2Icon size={20} />
            ) : (
              <AndroidIcon size={20} />
            )}
            <p>{row?.original?.device || "N/A"}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "demo",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center w-40">
          <CircleUser size={30} />{" "}
          <p className="text-[17px] text-primary">Demo</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            {row?.original?.ipAddress || "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "plan",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <PlanIcon size={19} />{" "}
          <p className="text-[17px] text-primary">Plan</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            {row?.original?.assignedBy?.name || "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "checkout",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <UseLimitIcon size={19} />{" "}
          <p className="text-[17px] text-primary">Checkout</p>
        </div>
      ),
      cell: ({ row }) => {
        const [block, setBlock] = useState(row?.original?.blocked);

        const { mutateAsync: blockMutation, isLoading: blockLoading } =
          useUpdate({
            isMultiPart: false,
            endpoint: UserAPI.UpdateUser + row?.original?._id,
          });

        const handleBlock = async () => {
          try {
            const newBlockState = !block;
            const res = await blockMutation({ blocked: newBlockState });
            if (res?.status === 200) {
              setBlock(newBlockState);
              toast.success(res?.data?.message || "User is Blocked Success !");
            }
          } catch (err) {
            console.log(err);
          }
        };

        return (
          <div className="flex justify-center items-center">
            {blockLoading ? (
              <Spinner />
            ) : (
              <Switch
                defaultChecked={block}
                className="data-[state=checked]:bg-[#34C759] "
                onCheckedChange={handleBlock}
              />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "paymentinitiated",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <PaymentGateWayIcon size={19} />{" "}
          <p className="text-[17px] text-primary">Payment Initiated</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            {row?.original?.assignedBy?.name || "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "paymentinitiated",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <RefundIcon size={19} />{" "}
          <p className="text-[17px] text-primary">Refund</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            {row?.original?.assignedBy?.name || "N/A"}
          </div>
        );
      },
    },
  ];
  return columns;
};
