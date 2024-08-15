/* eslint-disable react-hooks/rules-of-hooks */
import {
  BagIcon,
  PaymentGateWayIcon,
  PlanIcon,
  RefundIcon,
  UseLimitIcon,
  WebIcon,
} from "@/assets/icons";
import { CircleUser, UserIcon, Users } from "lucide-react";
import { PROD_IMG_Prefix } from "@/api/endpoints";
export const CountryColumn = ({ type }) => {
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
    ...(type === "country"
      ? [
          {
            accessorKey: "country",
            header: () => (
              <div className="flex justify-start space-x-2 px-2">
                <WebIcon size={19} />{" "}
                <p className="text-[17px] text-primary">Country</p>
              </div>
            ),
            cell: ({ row }) => {
              return (
                <div className="flex justify-center items-center">
                  <img
                    src={PROD_IMG_Prefix + row?.original?.planIcon}
                    alt="planicon"
                    className="w-6 h-6 rounded-full object-fill "
                  />
                  {row?.original?.country || "N/A"}
                </div>
              );
            },
          },
        ]
      : [
          {
            accessorKey: "plan",
            header: () => (
              <div className="flex justify-start space-x-2 px-2">
                <PlanIcon size={19} />{" "}
                <p className="text-[17px] text-primary ">Plan</p>
              </div>
            ),
            cell: ({ row }) => {
              return (
                <div className="flex justify-center items-center">
                  <img
                    src={PROD_IMG_Prefix + row?.original?.planIcon}
                    alt="planicon"
                    className="w-6 h-6 rounded-full object-fill "
                  />
                  {row?.original?.planName || "N/A"}
                </div>
              );
            },
          },
        ]),
    {
      accessorKey: "allusers",
      header: () => (
        <div className="flex justify-start space-x-2 px-2 w-28">
          <Users size={19} />{" "}
          <p className="text-[17px] text-primary ">All Users</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            {row?.original?.allUsers || "N/A"}
          </div>
        );
      },
    },

    {
      accessorKey: "sales",
      header: () => (
        <div className="flex space-x-2 px-2 justify-start">
          <BagIcon size={19} />{" "}
          <p className="text-[17px] text-primary items-start">Sales</p>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col justify-center items-center">
          <p className="text-[14px] font-normal text-green-500">
            {"$ " + row?.original?.sales?.totalSalesAmount || 0}{" "}
          </p>

          <div className="flex justify-center items-center space-x-1 ">
            <UserIcon className="text-gray-500 w-4 h-4" />
            <p className="text-[14px] font-normal text-gray-900">
              {row?.original?.sales?.totalUsersBought || 0}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "demo",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center ">
          <CircleUser size={19} />{" "}
          <p className="text-[17px] text-primary">Demo</p>
        </div>
      ),
      cell: ({ row }) => {
        return <div className="flex justify-center items-center">{row?.original?.demo || "N/A"}</div>;
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
            {row?.original?.totalPlan || "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "plan",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <UseLimitIcon size={19} />{" "}
          <p className="text-[17px] text-primary">Checkout</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            {row?.original?.totalCheckout || "N/A"}
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
            {row?.original?.totalPaymentInitiated || "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "Refund",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <RefundIcon size={19} />{" "}
          <p className="text-[17px] text-primary">Refund</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col justify-center items-center">
            <p className="text-[14px] font-normal text-red-500">
              {"$ " + (type === "country" ? row?.original?.refund?.totalRefunds : row?.original?.refund?.totalUsersRefunds ) || 0}
            </p>

            <div className="flex justify-center items-center space-x-1 ">
              <UserIcon className="text-gray-500 w-4 h-4" />
              <p className="text-[14px] font-normal text-gray-900">
                {row?.original?.refund?.totalRefundedAmount || 0}
              </p>
            </div>
          </div>
        );
      },
    },
  ];
  return columns;
};
