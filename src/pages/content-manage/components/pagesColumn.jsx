/* eslint-disable react-hooks/rules-of-hooks */
import { ActionIcon } from "@/assets/icons";
import { BookA, Clock1, Eye, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/custom/button";
import { useState } from "react";
import DeleteModal from "@/components/common/modals/delet-modal";
import { ContentManage } from "@/api/endpoints";
import { Switch } from "@/components/ui/switch";
import useUpdate from "@/hooks/use-update";
import toast from "react-hot-toast";
import Spinner from "@/components/common/Spinner";
import { formatDatewithTime } from "@/utils/dateConfig";
import { useNavigate } from "react-router-dom";

export const PagesColumn = ({ PageRefetch }) => {
  const navigate = useNavigate(); 

  const columns = [
    {
      accessorKey: "title",
      header: () => (
        <div className="lg:w-[700px] w-[100px] flex justify-start space-x-2 px-2 ">
          <BookA size={19} />{" "}
          <p className="text-[17px] text-primary">Page Title</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-start items-center ">
            {row?.original?.title}
          </div>
        );
      },
    },

    {
      accessorKey: "description",
      header: () => (
        <div className="flex justify-start space-x-2 px-2 ">
          <Clock1 size={19} />{" "}
          <p className="text-[17px] text-primary">Last Edit</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-start items-center ">
            {formatDatewithTime(row?.original?.updateAt)}
          </div>
        );
      },
    },

    {
      accessorKey: "live",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <Eye size={19} /> <p className="text-[17px] text-primary">Live</p>
        </div>
      ),
      cell: ({ row }) => {
        const [status, setStatus] = useState(row?.original?.status);

        const { mutateAsync: statusMutation, isLoading: statusLoading } =
          useUpdate({
            isMultiPart: false,
            endpoint: ContentManage.UpdatePages + row?.original?._id,
          });

        const handleStatus = async () => {
          try {
            const newBlockState = !status;
            const payload = {
              title: row.original.title,
              text: row.original.text,
              status: newBlockState,
            };
            const res = await statusMutation(payload);
            if (res?.status === 200) {
              setStatus(newBlockState);
              PageRefetch();
              toast.success(
                res?.data?.message || "Page Status Update Success !"
              );
            }
          } catch (err) {
            console.error(err);
          }
        };
        return (
          <div className="flex justify-center items-center">
            {statusLoading ? (
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
        <div className="inline-flex items-center justify-center  gap-2 text-base text-black font-medium w-[150px]">
          <ActionIcon />
          Action
        </div>
      ),
      cell: ({ row }) => {
        const [open, setOpen] = useState(false);
        const [id, setId] = useState("");

        return (
          <>
            <div className="flex space-x-2 justify-center items-center w-[150px]">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-lg hover:bg-black hover:text-white"
                onClick={() => {
                  navigate(`/content-manage/edit-pages/${row.original?._id}`)
                }}
              >
                {" "}
                <SquarePen className="w-5 h-5" />
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
              endpoint={ContentManage.DeletePages}
              id={id}
              dataRefetch={PageRefetch}
            />

          </>
        );
      },
    },
  ];
  return columns;
};
