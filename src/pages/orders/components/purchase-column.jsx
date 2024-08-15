/* eslint-disable react-hooks/rules-of-hooks */
import {
  ActionIcon,
  AmountIcon,
  EmailIcon,
  OpenIcon,
  PlanIcon,
  PurchasedIcon,
  RefundIcons,
  WebIcon,
} from "@/assets/icons";
import { Info, Plane, Trash2 } from "lucide-react";
import { Button } from "@/components/custom/button";
import { useState } from "react";
import DeleteModal from "@/components/common/modals/delet-modal";
import RefundModal from "@/components/common/modals/refund-modal";
import { RightDrawer } from "@/components/common/drawers/common-right-drawer";
import { formatDate } from "@/utils/dateConfig";
import OrderDetailsSide from "./order-details-side";
import { Order } from "@/api/endpoints";

export const PurchaseColumns = ({ tabKey, orderRefetch }) => {
  const columns = [
    ...(tabKey !== "Completed"
      ? [
          {
            accessorKey: "_id",
            header: () => (
              <div className="flex space-x-2 px-2 w-12">
                <p className="text-[17px] text-gray-500">Index</p>
              </div>
            ),
            cell: ({ row }) => (
              <div className="items-center flex justify-center text-gray-500">
                {"#" + row?.id}
              </div>
            ),
            enableSorting: false,
            enableHiding: false,
          },
          {
            accessorKey: "orderId",
            header: () => (
              <div className="flex space-x-2 px-2 w-20">
                <p className="text-[17px] text-gray-500">Order ID</p>
              </div>
            ),
            cell: ({ row }) => (
              <div className="items-center text-gray-500">
                {"#" + row?.original?.orderId}
              </div>
            ),
            enableSorting: false,
            enableHiding: false,
          },
        ]
      : []),
    {
      accessorKey: "email",
      header: () => (
        <div className="flex gap-2">
          <EmailIcon size={19} className="text-black" />{" "}
          <p className="text-[17px] text-primary">Email</p>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex break-normal text-wrap pr-2">
          {row?.original?.orderDetails?.email}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: () => (
        <div className="flex space-x-2">
          <WebIcon size={19} className="text-black" />
          <p className="text-[17px] text-primary">Country</p>
        </div>
      ),
      cell: ({ row }) => {
        return <div className="">{row?.original?.orderDetails?.country}</div>;
      },
    },
    ...(tabKey === "Completed" || tabKey === "Shipping"
      ? [
          {
            accessorKey: "purchase",
            header: () => (
              <div className="flex gap-2 text-primary">
                <PurchasedIcon size={19} />
                <p className="text-[17px]">Purchased</p>
              </div>
            ),
            cell: ({ row }) => (
              <div className="">
                {formatDate(row?.original?.orderDetails?.purchase)}
              </div>
            ),
          },
        ]
      : []),
    ...(tabKey === "pending"
      ? [
          {
            accessorKey: "checkout",
            header: () => (
              <div className="flex space-x-2 px-2">
                <PurchasedIcon size={19} />{" "}
                <p className="text-[17px] text-primary">Checkout</p>
              </div>
            ),
            cell: ({ row }) => (
              <div className="">
                {formatDate(row?.original?.orderDetails?.purchase)}
              </div>
            ),
          },
        ]
      : tabKey === "refunded"
      ? [
          {
            accessorKey: "checkout",
            header: () => (
              <div className="flex space-x-2 px-2">
                <PurchasedIcon size={19} />{" "}
                <p className="text-[17px] text-primary">Refund</p>
              </div>
            ),
            cell: ({ row }) => (
              <div className="">
                {formatDate(row?.original?.orderDetails?.purchase)}
              </div>
            ),
          },
        ]
      : []),
    ...(tabKey !== "shipping"
      ? [
          {
            accessorKey: "plan",
            header: () => (
              <div className="flex space-x-2 px-2">
                <PlanIcon size={19} className="fill-white text-black" />{" "}
                <p className="text-[17px] text-primary">Plan</p>
              </div>
            ),
            cell: ({ row }) => (
              <div className="flex justify-center items-center space-x-2">
                <p>{row?.original?.planDetails?.planName}</p> <Info size={16} />
              </div>
            ),
            filterFn: (row, id, value) => {
              return value.includes(row.getValue(id));
            },
          },
        ]
      : []),
    //shipping .......
    ...(tabKey === "shipping"
      ? [
          {
            accessorKey: "shipping",
            header: () => (
              <div className="flex space-x-2 px-2">
                <Plane size={19} className="fill-white text-black" />{" "}
                <p className="text-[17px] text-primary">Shipping</p>
              </div>
            ),
            cell: ({ row }) => (
              <div className="flex items-center justify-center w-[80px]">
                {" "}
                $ {row?.original?.planDetails?.amount}
              </div>
            ),
            filterFn: (row, id, value) => {
              return value.includes(row.getValue(id));
            },
          },
          {
            accessorKey: "amount",
            header: () => (
              <div className="flex space-x-2 px-2">
                <PlanIcon size={19} className="fill-white text-black" />{" "}
                <p className="text-[17px] text-primary">Products</p>
              </div>
            ),
            cell: ({ row }) => (
              <div className="flex items-center justify-center w-[80px]">
                {" "}
                $ {row?.original?.planDetails?.amount}
              </div>
            ),
            filterFn: (row, id, value) => {
              return value.includes(row.getValue(id));
            },
          },
        ]
      : []),
    {
      accessorKey: "amount",
      header: () => (
        <div className="flex space-x-2 px-2">
          <AmountIcon size={19} className="fill-white text-black" />{" "}
          <p className="text-[17px] text-primary">Amount</p>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center w-[80px]">
          {" "}
          $ {row?.original?.planDetails?.amount}
        </div>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "paymentMethod",
      header: () => (
        <div className="flex space-x-2 px-2">
          <PlanIcon size={19} className="fill-white text-black" />{" "}
          <p className="text-[17px] text-primary">Method</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            {row?.original?.paymentMethod}
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
        <div className="inline-flex items-center justify-center w-[150px] gap-2 text-base text-black font-medium">
          <ActionIcon />
          Action
        </div>
      ),
      cell: ({ row }) => {
        const [open, setOpen] = useState(false);
        const [ropen, setROpen] = useState(false);
        const [dopen, setDOpen] = useState(false);
        const [id, setId] = useState("");

        return (
          <>
            <div className="flex space-x-2 justify-center items-center w-[150px]">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-lg hover:bg-black hover:text-white"
                onClick={() => {
                  setDOpen(true);
                  setId(row.original?._id);
                }}
              >
                {" "}
                <OpenIcon size={24} />
              </Button>
              {tabKey === "purchase" && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-lg hover:bg-blue-500 hover:text-white"
                  onClick={() => setROpen(true)}
                >
                  <RefundIcons size={24} className="" />
                </Button>
              )}

              <Button
                size="icon"
                variant="ghost"
                className="rounded-lg hover:bg-red-500 hover:text-white text-red-500"
                onClick={() => {
                  setOpen(true);
                  setId(row.original?._id);
                }}
              >
                <Trash2 className="w-5 h-5 " />
              </Button>
            </div>
            <RefundModal open={ropen} setOpen={setROpen} id={id} dataRefetch={orderRefetch}/>
            <DeleteModal
              open={open}
              setOpen={setOpen}
              endpoint={Order.Delete_Order}
              id={id}
              dataRefetch={orderRefetch}
            />
            <RightDrawer open={dopen} setOpen={setDOpen}>
              <OrderDetailsSide id={id} />
            </RightDrawer>
          </>
        );
      },
    },
  ];
  return columns;
};
