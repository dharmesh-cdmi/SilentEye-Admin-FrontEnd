/* eslint-disable react-hooks/rules-of-hooks */
import {
  ActionIcon,
  AmountIcon,
  CreatedIcon,
  DiscountIcon,
  EyeIcon,
  IdendityIcon,
  PlanIcon,
  PurchasedIcon,
  RefundIcons,
} from "@/assets/icons";
import { Info, Plane, Trash2 } from "lucide-react";
import { Button } from "@/components/custom/button";
import { useState } from "react";
import DeleteModal from "@/components/common/modals/delet-modal";
import RefundModal from "@/components/common/modals/refund-modal";
import { formatDate } from "@/utils/dateConfig";
import { Order } from "@/api/endpoints";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export const DefaultColumn = ({ tabKey, orderRefetch }) => {
  return [
    {
      accessorKey: "_id",
      header: () => <div className="flex text-base text-gray-500">Order</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center text-black">
          {row?.id}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <IdendityIcon /> Name
        </div>
      ),
      cell: ({ row }) => (
        <div className="">{row?.original?.orderDetails?.email}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <CreatedIcon /> Created
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-base text-black">
            {row?.original?.orderDetails?.country}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => (
        <div className="flex justify-end gap-2 text-base text-black">
          <AmountIcon size={19} className="fill-white" />
          Amount
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-end justify-end text-base text-black font-medium">
          <span className="opacity-80">$</span>
          <h3 className="text-xl">{row?.original?.planDetails?.amount}</h3>
          <span className="opacity-80">.00</span>
        </div>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "mrp",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <DiscountIcon /> MRP
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-end justify-center text-base text-black font-medium">
            <span className="opacity-80">$</span>
            <h3 className="text-xl">1000</h3>
            <span className="opacity-80">.00</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "discount",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <DiscountIcon /> Discount
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-end justify-center text-base text-rose-600 font-medium">
            <span className="opacity-80">$</span>
            <h3 className="text-xl">1000</h3>
            <span className="opacity-80">.00</span>
          </div>
        );
      },
    },
    {
      accessorKey: "discount",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <DiscountIcon /> Tag
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <Badge className="h-7 bg-green-50 hover:bg-green-50 font-normal text-nowrap border-green-600 text-green-600 uppercase">
              90% OFF
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "isLive",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <EyeIcon /> Live
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <Switch
              className="data-[state=checked]:bg-[#34C759]"
              defaultChecked={true}
              onCheckedChange={(val) => console.log(val)}
            />
          </div>
        );
      },
    },
    {
      id: "actions",
      accessorKey: "Action",
      header: () => (
        <div className="flex items-center justify-end gap-2 text-base text-black">
          <ActionIcon size={22} />
          Action
        </div>
      ),
      cell: ({ row }) => {
        const [open, setOpen] = useState(false);
        const [ropen, setROpen] = useState(false);
        const [id, setId] = useState("");

        return (
          <>
            <div className="flex justify-center items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-lg hover:bg-blue-500 hover:text-white"
                onClick={() => setROpen(true)}
              >
                <RefundIcons size={24} className="" />
              </Button>

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
            <RefundModal open={ropen} setOpen={setROpen} />
            <DeleteModal
              open={open}
              setOpen={setOpen}
              endpoint={Order.Delete_Order}
              id={id}
              dataRefetch={orderRefetch}
            />
          </>
        );
      },
    },
  ];
};

export const UpsellColumn = ({ tabKey, orderRefetch }) => {
  return [
    {
      accessorKey: "_id",
      header: () => <div className="flex text-base text-gray-500">Order</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center text-black">
          {row?.id}
        </div>
      ),
    },
    {
      accessorKey: "plan",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <IdendityIcon /> Plan
        </div>
      ),
      cell: ({ row }) => (
        <div className="">{row?.original?.orderDetails?.email}</div>
      ),
    },
    {
      accessorKey: "upsell",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <IdendityIcon /> UpSell
        </div>
      ),
      cell: ({ row }) => (
        <div className="">{row?.original?.orderDetails?.email}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <CreatedIcon /> Created
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-base text-black">
            {row?.original?.orderDetails?.country}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => (
        <div className="flex justify-end gap-2 text-base text-black">
          <AmountIcon size={19} className="fill-white" />
          Amount
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-end justify-end text-base text-black font-medium">
          <span className="opacity-80">$</span>
          <h3 className="text-xl">{row?.original?.planDetails?.amount}</h3>
          <span className="opacity-80">.00</span>
        </div>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "mrp",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <DiscountIcon /> MRP
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-end justify-center text-base text-black font-medium">
            <span className="opacity-80">$</span>
            <h3 className="text-xl">1000</h3>
            <span className="opacity-80">.00</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "discount",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <DiscountIcon /> Discount
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-end justify-center text-base text-rose-600 font-medium">
            <span className="opacity-80">$</span>
            <h3 className="text-xl">1000</h3>
            <span className="opacity-80">.00</span>
          </div>
        );
      },
    },
    {
      accessorKey: "discount",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <DiscountIcon /> Tag
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <Badge className="h-7 bg-green-50 hover:bg-green-50 font-normal text-nowrap border-green-600 text-green-600 uppercase">
              90% OFF
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "isLive",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <EyeIcon /> Live
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <Switch
              className="data-[state=checked]:bg-[#34C759]"
              defaultChecked={true}
              onCheckedChange={(val) => console.log(val)}
            />
          </div>
        );
      },
    },
    {
      id: "actions",
      accessorKey: "Action",
      header: () => (
        <div className="flex items-center justify-end gap-2 text-base text-black">
          <ActionIcon size={22} />
          Action
        </div>
      ),
      cell: ({ row }) => {
        const [open, setOpen] = useState(false);
        const [ropen, setROpen] = useState(false);
        const [id, setId] = useState("");

        return (
          <>
            <div className="flex justify-center items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-lg hover:bg-blue-500 hover:text-white"
                onClick={() => setROpen(true)}
              >
                <RefundIcons size={24} className="" />
              </Button>

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
            <RefundModal open={ropen} setOpen={setROpen} />
            <DeleteModal
              open={open}
              setOpen={setOpen}
              endpoint={Order.Delete_Order}
              id={id}
              dataRefetch={orderRefetch}
            />
          </>
        );
      },
    },
  ];
};

export const AddonColumns = ({ tabKey, orderRefetch }) => {
  return [
    {
      accessorKey: "_id",
      header: () => <div className="flex text-base text-gray-500">Order</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center text-black">
          {row?.id}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <IdendityIcon /> Title
        </div>
      ),
      cell: ({ row }) => (
        <div className="">{row?.original?.orderDetails?.email}</div>
      ),
    },
    {
      accessorKey: "description",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <IdendityIcon /> Description
        </div>
      ),
      cell: ({ row }) => (
        <div className="">{row?.original?.orderDetails?.email}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <CreatedIcon /> Created
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-base text-black">
            {row?.original?.orderDetails?.country}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => (
        <div className="flex justify-end gap-2 text-base text-black">
          <AmountIcon size={19} className="fill-white" />
          Amount
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-end justify-end text-base text-black font-medium">
          <span className="opacity-80">$</span>
          <h3 className="text-xl">{row?.original?.planDetails?.amount}</h3>
          <span className="opacity-80">.00</span>
        </div>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "mrp",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <DiscountIcon /> MRP
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-end justify-center text-base text-black font-medium">
            <span className="opacity-80">$</span>
            <h3 className="text-xl">1000</h3>
            <span className="opacity-80">.00</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "discount",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <DiscountIcon /> Checked
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <Switch
              className="data-[state=checked]:bg-[#34C759]"
              defaultChecked={true}
              onCheckedChange={(val) => console.log(val)}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "isLive",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <EyeIcon /> Live
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <Switch
              className="data-[state=checked]:bg-[#34C759]"
              defaultChecked={true}
              onCheckedChange={(val) => console.log(val)}
            />
          </div>
        );
      },
    },
    {
      id: "actions",
      accessorKey: "Action",
      header: () => (
        <div className="flex items-center justify-end gap-2 text-base text-black">
          <ActionIcon size={22} />
          Action
        </div>
      ),
      cell: ({ row }) => {
        const [open, setOpen] = useState(false);
        const [ropen, setROpen] = useState(false);
        const [id, setId] = useState("");

        return (
          <>
            <div className="flex justify-center items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-lg hover:bg-blue-500 hover:text-white"
                onClick={() => setROpen(true)}
              >
                <RefundIcons size={24} className="" />
              </Button>

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
            <RefundModal open={ropen} setOpen={setROpen} />
            <DeleteModal
              open={open}
              setOpen={setOpen}
              endpoint={Order.Delete_Order}
              id={id}
              dataRefetch={orderRefetch}
            />
          </>
        );
      },
    },
  ];
};

export const ProductColumns = ({ tabKey, orderRefetch }) => {
  return [
    {
      accessorKey: "_id",
      header: () => <div className="flex text-base text-gray-500">Order</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center text-black">
          {row?.id}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: () => (
        <div className="min-w-[20vh] md:min-w-[40vh] lg:min-w-[60vh] xl:min-w-[80vh] flex items-center gap-2 text-base text-black">
          <IdendityIcon /> Title
        </div>
      ),
      cell: ({ row }) => (
        <div className="">{row?.original?.orderDetails?.email}</div>
      ),
    },
    {
      accessorKey: "mrp",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <DiscountIcon /> MRP
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-end justify-center text-base text-black font-medium">
            <span className="opacity-80">$</span>
            <h3 className="text-xl">1000</h3>
            <span className="opacity-80">.00</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "isLive",
      header: () => (
        <div className="flex justify-center items-center gap-2 text-base text-black">
          <EyeIcon /> Live
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <Switch
              className="data-[state=checked]:bg-[#34C759]"
              defaultChecked={true}
              onCheckedChange={(val) => console.log(val)}
            />
          </div>
        );
      },
    },
    {
      id: "actions",
      accessorKey: "Action",
      header: () => (
        <div className="flex items-center justify-end gap-2 text-base text-black">
          <ActionIcon size={22} />
          Action
        </div>
      ),
      cell: ({ row }) => {
        const [open, setOpen] = useState(false);
        const [ropen, setROpen] = useState(false);
        const [id, setId] = useState("");

        return (
          <>
            <div className="flex justify-end items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-lg hover:bg-blue-500 hover:text-white"
                onClick={() => setROpen(true)}
              >
                <RefundIcons size={24} className="" />
              </Button>

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
            <RefundModal open={ropen} setOpen={setROpen} />
            <DeleteModal
              open={open}
              setOpen={setOpen}
              endpoint={Order.Delete_Order}
              id={id}
              dataRefetch={orderRefetch}
            />
          </>
        );
      },
    },
  ];
};

export const ShippingColumns = ({ tabKey, orderRefetch }) => {
  return [
    {
      accessorKey: "_id",
      header: () => <div className="flex text-base text-gray-500">Order</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center text-black">
          {row?.id}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <IdendityIcon /> Title
        </div>
      ),
      cell: ({ row }) => (
        <div className="">{row?.original?.orderDetails?.email}</div>
      ),
    },
    {
      accessorKey: "aays",
      header: () => (
        <div className="flex items-center gap-2 text-base text-black">
          <IdendityIcon /> Days
        </div>
      ),
      cell: ({ row }) => (
        <div className="">{row?.original?.orderDetails?.email}</div>
      ),
    },
    {
      accessorKey: "price",
      header: () => (
        <div className="flex gap-2 text-base text-black">
          <AmountIcon size={20} className="fill-white" />
          Price
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-end justify-end text-base text-black font-medium">
          <span className="opacity-80">$</span>
          <h3 className="text-xl">{row?.original?.planDetails?.amount}</h3>
          <span className="opacity-80">.00</span>
        </div>
      ),
    },
    {
      accessorKey: "isLive",
      header: () => (
        <div className="flex justify-center items-center gap-2 text-base text-black">
          <EyeIcon /> Live
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <Switch
              className="data-[state=checked]:bg-[#34C759]"
              defaultChecked={true}
              onCheckedChange={(val) => console.log(val)}
            />
          </div>
        );
      },
    },
    {
      id: "actions",
      accessorKey: "Action",
      header: () => (
        <div className="flex items-center justify-end gap-2 text-base text-black">
          <ActionIcon size={22} />
          Action
        </div>
      ),
      cell: ({ row }) => {
        const [open, setOpen] = useState(false);
        const [ropen, setROpen] = useState(false);
        const [id, setId] = useState("");

        return (
          <>
            <div className="flex justify-end items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-lg hover:bg-blue-500 hover:text-white"
                onClick={() => setROpen(true)}
              >
                <RefundIcons size={24} className="" />
              </Button>

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
            <RefundModal open={ropen} setOpen={setROpen} />
            <DeleteModal
              open={open}
              setOpen={setOpen}
              endpoint={Order.Delete_Order}
              id={id}
              dataRefetch={orderRefetch}
            />
          </>
        );
      },
    },
  ];
};
