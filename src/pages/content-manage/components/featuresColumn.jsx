/* eslint-disable react-hooks/rules-of-hooks */
import { ActionIcon } from "@/assets/icons";
import {
  BookA,
  BookText,
  Eye,
  Sparkles,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/custom/button";
import { useState } from "react";
import DeleteModal from "@/components/common/modals/delet-modal";
import { ContentManage, PROD_ADMIN_BASE_URL } from "@/api/endpoints";
import { Switch } from "@/components/ui/switch";
import useUpdate from "@/hooks/use-update";
import toast from "react-hot-toast";
import Spinner from "@/components/common/Spinner";
import CommonModal from "@/components/common/modals/common-modal";
import AddFeatures from "./features/AddFeatures";

export const FeatureColumn = ({ FeatureRefetch }) => {
  const columns = [
    {
      accessorKey: "_id",
      header: () => (
        <div className="flex justify-start space-x-2 px-2 w-12">
          <p className="text-[17px] text-gray-500">Order</p>
        </div>
      ),
      cell: ({ row }) => (
        <div className="items-center flex justify-start text-gray-500">
          {row?.id}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "icon",
      header: () => (
        <div className="flex justify-start space-x-2 px-2">
          <Sparkles size={19} className="text-black" />{" "}
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-start">
          {" "}
          <img
            src={PROD_ADMIN_BASE_URL + "/" + row?.original?.icon}
            alt=""
            className=""
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: () => (
        <div className="flex justify-start space-x-2 px-2">
          <BookA size={19} /> <p className="text-[17px] text-primary">Title</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-start items-center">
            {row?.original?.title}
          </div>
        );
      },
    },

    {
      accessorKey: "description",
      header: () => (
        <div className="flex justify-start space-x-2 px-2">
          <BookText size={19} />{" "}
          <p className="text-[17px] text-primary">Description</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-start items-center">
            {row?.original?.description}
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <Eye size={19} /> <p className="text-[17px] text-primary">Live</p>
        </div>
      ),
      cell: ({ row }) => {
        const [status, setStatus] = useState(row?.original?.status);

        const { mutateAsync: statusMutation, isLoading: StatusLoading } =
          useUpdate({
            isMultiPart: false,
            endpoint: ContentManage.UpdateFeatures + row?.original?._id,
          });

        const handleStatus = async () => {
          try {
            const newBlockState = !status;

            const payload = {
              ...row.original,
              status: row?.original?.status
                ? row?.original?.status
                : newBlockState,
            };

            const formData = new FormData();
            formData.append("status", payload.status);
            formData.append("title", payload.title);
            formData.append("description", payload.description);
            formData.append("stopHere", payload.stopHere);
            formData.append("process", payload.process);
            formData.append("failCount", payload.failCount);

            const res = await statusMutation(formData);
            if (res?.status === 200) {
              setStatus(newBlockState);
              toast.success(
                res?.data?.message || "Live Status Update Success !"
              );
            } else {
              toast.error("Something went wrong !");
            }
          } catch (err) {
            console.log(err);
          }
        };
        return (
          <div className="flex justify-center items-center">
            {StatusLoading ? (
              <Spinner />
            ) : (
              <Switch
                defaultChecked={status}
                className="data-[state=checked]:bg-[#34C759] "
                onCheckedChange={handleStatus}
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
                <SquarePen size={24} />
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
              endpoint={ContentManage.DeleteFeatures}
              id={id}
              dataRefetch={FeatureRefetch}
            />
            <CommonModal
              open={dopen}
              setOpen={setDOpen}
              title={"Update New Features"}
              width={800}
            >
              <AddFeatures setOpen={setOpen} Refetch={FeatureRefetch} data={row?.original}/>
            </CommonModal>

          
          </>
        );
      },
    },
  ];
  return columns;
};
