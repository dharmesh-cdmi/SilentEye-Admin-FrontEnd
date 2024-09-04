/* eslint-disable react-hooks/rules-of-hooks */
import {
  ActionIcon,
  DiscountIcon,
  EyeIcon,
  IdendityIcon
} from "@/assets/icons";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/custom/button";
import { useState } from "react";
import DeleteModal from "@/components/common/modals/delet-modal";
import {  PROD_IMG_Prefix, Product } from "@/api/endpoints";
import { Switch } from "@/components/ui/switch";
import Spinner from "@/components/common/Spinner";
import useUpdate from "@/hooks/use-update";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ProductsColumn = ({ ProductsRefetch }) => {
  const navigate = useNavigate();
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
        <div className="flex justify-start lg:w-[700px] w-[200px] items-center gap-2 text-base text-black">
          <IdendityIcon /> Title
        </div>
      ),
      cell: ({ row }) => {
        const mainImage = row?.original?.mainImage ? PROD_IMG_Prefix + row?.original?.mainImage : "/Logo.svg";
        const subImage = row?.original?.image2 ? PROD_IMG_Prefix + row?.original?.image2 : "/Logo.svg";
        return (
          <div className="lg:w-[700px] w-[200px] font-semibold text-[15px] flex justify-start items-center space-x-2">
            <div className="flex ">
              <img
                src={mainImage}
                alt="product"
                className="w-5 h-5 rounded-full "
              />
              <img
                src={subImage}
                alt="product"
                className="w-5 h-5 rounded-full "
              />
            </div>
            <p className="text-[15px] font-semibold ">{row?.original?.title}</p>
          </div>
        );
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
            <del className="flex text-xl">
              <span className="opacity-80">$</span>
              <h3 className="text-xl">{row?.original?.mrp}</h3>
              <span className="opacity-80">.00</span>
            </del>
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
        const [status,setStatus] = useState(row?.original?.status === "live");

        const { mutateAsync: statusMutation, isLoading: statusLoading } =
          useUpdate({
            isMultiPart: false,
            endpoint: Product.UpdateProduct + row?.original?._id,
          });

        const handleStatus = async (checked) => {
          try {
            // 
            const newStatus = checked ? "live" : "test";
            const payload = {
              status: newStatus,
            };
            const res = await statusMutation(payload);
            if (res?.status === 200) {
              await ProductsRefetch();
              setStatus(checked);
              toast.success(
                res?.data?.message || "Product Status Update Success !"
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
        <div className="flex items-center justify-end gap-2 text-base text-black">
          <ActionIcon size={22} />
          Action
        </div>
      ),
      cell: ({ row }) => {
        const [open, setOpen] = useState(false);
        
        const [id, setId] = useState("");

        return (
          <>
            <div className="flex justify-center items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-lg hover:bg-blue-500 hover:text-white"
                onClick={() => navigate(`/plans/update-products/${row?.original?._id}`)}
              >
                <Edit size={19} className="" />
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
              endpoint={Product.AllProduct}
              id={id}
              dataRefetch={ProductsRefetch}
            />
          </>
        );
      },
    },
  ];
};
