/* eslint-disable react-hooks/rules-of-hooks */
import { ActionIcon, Card, RatingsHalf } from "@/assets/icons";
import { Trash2, MessageCircleMore, SquarePen, Eye } from "lucide-react";
import { Button } from "@/components/custom/button";
import { useState } from "react";
import DeleteModal from "@/components/common/modals/delet-modal";
import { ContentManage, PROD_IMG_Prefix } from "@/api/endpoints";
import { Switch } from "@/components/ui/switch";
import useUpdate from "@/hooks/use-update";
import toast from "react-hot-toast";
import Spinner from "@/components/common/Spinner";
import StarRating from "@/components/common/star-rating";
import CommonModal from "@/components/common/modals/common-modal";
import AddReviews from "./reviews/AddReviews";

export const ReviewsColumn = ({ ReviewRefetch }) => {
  const columns = [
    {
      accessorKey: "_id",
      header: () => (
        <div className="flex space-x-2 px-2 w-12 justify-start">
          <p className="text-[17px] text-gray-500">Order</p>
        </div>
      ),
      cell: ({ row }) => (
        <div className="items-center w-12 flex justify-center text-gray-500">
          {row?.id}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "name",
      header: () => (
        <div className="flex justify-start items-center space-x-2 px-2 min-w-[300px]">
          <Card size={22} /> <p className="text-[17px] text-primary">Name</p>
        </div>
      ),
      cell: ({ row }) => {
        const imgpreview = `${PROD_IMG_Prefix}+${row?.original?.profile}`;
        return (
          <div className="flex justify-start space-x-2">
            <img
              src={imgpreview}
              alt="profile"
              width={50}
              height={50}
              className="w-8 h-8 rounded-full"
            />
            <p className="text-[16px] ">{row?.original?.name}</p>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "ratings",
      header: () => (
        <div className="flex justify-center space-x-2 px-2">
          <RatingsHalf size={22} />{" "}
          <p className="text-[17px] text-primary">Ratings</p>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            <StarRating rating={row?.original?.rating} />
          </div>
        );
      },
    },
    {
      accessorKey: "review",
      header: () => (
        <div className="flex justify-center space-x-2 px-2">
          <MessageCircleMore size={22} />{" "}
          <p className="text-[17px] text-primary">Review</p>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          {row?.original?.review}
        </div>
      ),
    },
    {
      accessorKey: "live",
      header: () => (
        <div className="flex space-x-2 px-2 justify-center">
          <Eye size={22} /> <p className="text-[17px] text-primary">Live</p>
        </div>
      ),
      cell: ({ row }) => {
        const [status, setStatus] = useState(row?.original?.status);

        const { mutateAsync: statusMutation, isLoading: statusLoading } =
          useUpdate({
            isMultiPart: false,
            endpoint: ContentManage.UpdateReviews + row?.original?._id,
          });

        const handleStatus = async () => {
          try {
            const newBlockState = !status;
            const payload = {
              title: row.original.title,
              name: row.original.name,
              rating: row.original.rating,
              review: row.original.rating,
              status: newBlockState,
            };
            const formData = new FormData();
            formData.append("status", payload.status);
            formData.append("title", payload.title);
            formData.append("name", payload.name);
            formData.append("rating", payload.rating);
            formData.append("review", payload.review);

            const res = await statusMutation(formData);
            if (res?.status === 200) {
              setStatus(newBlockState);
              ReviewRefetch();
              toast.success(
                res?.data?.message || "Review Status Update Success !"
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
        <div className="inline-flex items-center justify-center w-[150px] gap-2 text-base text-black font-medium">
          <ActionIcon size={20} />
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
                <SquarePen size={19} />
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
              endpoint={ContentManage.DeleteReviews}
              id={id}
              dataRefetch={ReviewRefetch}
            />
            <CommonModal
              open={dopen}
              setOpen={setDOpen}
              title={"Update Reviews"}
              width={800}
            >
              <AddReviews
                setOpen={setDOpen}
                Refetch={ReviewRefetch}
                data={row?.original}
              />
            </CommonModal>
          </>
        );
      },
    },
  ];
  return columns;
};
