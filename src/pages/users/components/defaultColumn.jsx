/* eslint-disable react-hooks/rules-of-hooks */
import {
  AccessManageIcon,
  ActionIcon,
  AmountIcon,
  AndroidIcon,
  EmailIcon,
  IosIcon,
  OpenIcon,
  ShildIcon,
  WebIcon,
} from "@/assets/icons";
import {
  Clock3,
  Clock5,
  Laptop2Icon,
  MonitorSmartphone,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import { Button } from "@/components/custom/button";
import { useState } from "react";
import DeleteModal from "@/components/common/modals/delet-modal";
import { formatDate } from "@/utils/dateConfig";
import { UserAPI } from "@/api/endpoints";
import { Checkbox } from "@/components/ui/checkbox";
import { RightDrawer } from "@/components/common/drawers/common-right-drawer";
import UserDetailsAction from "./user-details-action";
import UserJourney from "./user-journey";
import { Switch } from "@/components/ui/switch";
import useUpdate from "@/hooks/use-update";
import toast from "react-hot-toast";
import Spinner from "@/components/common/Spinner";

export const DefaultColumn = ({ UserRefetch }) => {
  const columns = [
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
      accessorKey: "email",
      header: () => (
        <div className="flex space-x-2 px-2">
          <EmailIcon size={19} className="text-black" />{" "}
          <p className="text-[17px] text-primary">Email</p>
        </div>
      ),
      cell: ({ row }) => <div className="">{row?.original?.email}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: () => (
        <div className="flex justify-center space-x-2 px-2">
          <WebIcon size={19} />{" "}
          <p className="text-[17px] text-primary">Country</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            {row?.original?.userDetails?.country}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="flex space-x-2 px-2">
          <UserCheck size={19} />{" "}
          <p className="text-[17px] text-primary">Status</p>
        </div>
      ),
      cell: ({ row }) => {
        let status = row?.original?.userStatus;
        return (
          <div className="flex justify-center items-center">
            {status === "Checkout" ? (
              <div className="px-2 py-1 max-w-32 rounded-full text-white bg-yellow-500 items-center">
                {status}
              </div>
            ) : status === "Demo" ? (
              <div className="px-2 py-1 max-w-32 rounded-full text-white bg-blue-500 items-center">
                {status}
              </div>
            ) : status === "Paid" ? (
              <div className="px-2 py-1 max-w-32 rounded-full text-white bg-green-500 items-center">
                {status}
              </div>
            ) : (
              <div className="px-2 py-1 max-w-32 rounded-full text-white bg-gray-400 items-center">
                {status}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "process",
      header: () => (
        <div className="flex space-x-2 px-2">
          <Clock3 size={19} />{" "}
          <p className="text-[17px] text-primary">Process</p>
        </div>
      ),
      cell: ({ row }) => {
        let status = row?.original?.process;

        return (
          <div className="flex justify-center items-center">
            {status === "Running" ? (
              <div className="px-3 py-1 max-w-32 rounded-full text-white bg-violet-500 items-center">
                {status}
              </div>
            ) : status === "Pending" ? (
              <div className="px-3 py-1 max-w-32 rounded-full text-white bg-yellow-500 items-center">
                {status}
              </div>
            ) : status === "Completed" ? (
              <div className="px-3 py-1 max-w-32 rounded-full text-white bg-green-500 items-center">
                {status}
              </div>
            ) : (
              <div className="px-3 py-1 max-w-32 rounded-full text-white bg-gray-400 items-center">
                {status}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "joined",
      header: () => (
        <div className="flex space-x-2 px-2">
          <Clock5 size={19} />{" "}
          <p className="text-[17px] text-primary">Joined</p>
        </div>
      ),
      cell: ({ row }) => {
        return <div className="">{formatDate(row?.original?.joined)}</div>;
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
      accessorKey: "amountRefund",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <AmountIcon size={36} />{" "}
          <p className="text-[17px] text-primary">Amount Refund</p>
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
      accessorKey: "device",
      header: () => (
        <div className="flex space-x-2 px-2 justify-start">
          <MonitorSmartphone size={19} />{" "}
          <p className="text-[17px] text-primary">Device</p>
        </div>
      ),
      cell: ({ row }) => {
        // Example usage
        // const deviceType = getDeviceType(row?.original?.device);

        return (
          <div className="flex justify-start items-center space-x-2 w-[120px]">
            {row?.original?.device && row?.original?.deviceType === "IOS" ? (
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
      accessorKey: "ipaddress",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center w-40">
          <WebIcon size={30} />{" "}
          <p className="text-[17px] text-primary">IP Address</p>
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
      accessorKey: "manager",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <AccessManageIcon size={19} />{" "}
          <p className="text-[17px] text-primary">Manager</p>
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
      accessorKey: "block",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <UserX size={19} /> <p className="text-[17px] text-primary">Block</p>
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
            console.error(err);
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
              <Button
                size="icon"
                variant="ghost"
                className="rounded-lg hover:bg-[#8C0DF0] hover:text-white text-red-500"
                onClick={() => {
                  setROpen(true);
                  setId(row.original?._id);
                }}
              >
                <ShildIcon
                  size={24}
                  className="hover:text-white text-red-500"
                />
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

            <DeleteModal
              open={open}
              setOpen={setOpen}
              endpoint={UserAPI.AllUsers}
              id={id}
              dataRefetch={UserRefetch}
            />
            <RightDrawer open={ropen} setOpen={setROpen} title="User Journey">
              <UserJourney id={id} />
            </RightDrawer>
            <RightDrawer open={dopen} setOpen={setDOpen} title="Details">
              <UserDetailsAction id={id} />
            </RightDrawer>
          </>
        );
      },
    },
  ];
  return columns;
};
