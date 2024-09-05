import { ContentManage, PROD_IMG_Prefix } from "@/api/endpoints";
import { Field as TextField } from "@/components/common/common-form";
import Loader from "@/components/common/loader";
import CommonModal from "@/components/common/modals/common-modal";
import DeleteModal from "@/components/common/modals/delet-modal";
import { Button } from "@/components/custom/button";
import { Switch } from "@/components/ui/switch";
import useGet from "@/hooks/use-get";
import useUpdate from "@/hooks/use-update";
import { ImageIcon, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AddCategory from "./AddCategory";

const EditCategory = () => {
  const [open, setDOpen] = useState(false);
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [status, setStatus] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState();

  const {
    data: { data: faqsData = {} } = {},
    isLoading: faqsLoading,
    refetch: FaqsRefetch,
  } = useGet({
    key: "faqsData",
    endpoint: ContentManage.AllFaqs,
  });

  const { mutateAsync: statusMutation } = useUpdate({
    isMultiPart: false,
    endpoint: ContentManage.UpdateFaq + id,
  });

  const handleStatus = async () => {
    try {
      const newStatus = !status;
      const payload = {
        status: newStatus,
        title: title,
      };
      const res = await statusMutation(payload);
      if (res?.status === 200) {
        setStatus(newStatus);
        toast.success(res?.data?.message || "Category Update Successfully !");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      {faqsLoading ? (
        <Loader />
      ) : (
        <div className="h-[400px] overflow-y-auto py-5 px-2 ">
          {faqsData?.categories?.map((item, id) => (
            <div key={id} className="">
              <TextField
                icon={id}
                className={`border border-b `}
                className2={"py-0"}
                className3={"min-w-16 text-center justify-center py-0"}
                value={
                  <div className="flex justify-between ">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="border-r px-2 py-2">
                        {item?.image ? (
                          <img
                            src={PROD_IMG_Prefix + item?.image}
                            alt="icon"
                            width={100}
                            height={100}
                            className="w-7 h-7 rounded-lg"
                          />
                        ) : (
                          <ImageIcon size={19} />
                        )}
                      </div>
                      <div className="min-w-20">
                        <h2>{item?.title}</h2>
                      </div>
                    </div>
                    <div className="items-center py-2 px-2 justify-center flex space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-lg hover:bg-gray-800 hover:text-white text-black"
                        onClick={() => {
                          setOpenModal(true);
                          setData(item);
                        }}
                      >
                        <SquarePen  className="w-5 h-5"/>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-lg hover:bg-red-500 hover:text-white text-red-500"
                        onClick={() => {
                          setDOpen(true);
                          setId(item?._id);
                        }}
                      >
                        <Trash2 className="w-5 h-5 " />
                      </Button>
                      <Switch
                        defaultChecked={item?.status}
                        className="data-[state=checked]:bg-[#34C759] "
                        onCheckedChange={() => {
                          setId(item?._id);
                          setTitle(item?.title);
                          handleStatus();
                        }}
                      />
                    </div>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      )}
      <DeleteModal
        open={open}
        setOpen={setDOpen}
        endpoint={ContentManage.DeleteFaq}
        id={id}
        dataRefetch={FaqsRefetch}
      />
      <CommonModal
        open={openModal}
        setOpen={setOpenModal}
        title={"Update Category "}
      >
        <AddCategory
          setOpen={setOpenModal}
          Refetch={FaqsRefetch}
          data={data}
        />
      </CommonModal>
    </div>
  );
};

export default EditCategory;
