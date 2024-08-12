import CustomTabs from "@/components/common/custom-tabs";
import Loader from "@/components/common/loader";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import AddFAQForm from "./AddFaqs";
import FaqsTable from "./FaqsTable";
import useGet from "@/hooks/use-get";
import { ContentManage } from "@/api/endpoints";
import { CirclePlus, SquarePen } from "lucide-react";
import CommonModal from "@/components/common/modals/common-modal";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

const Faqs = () => {
  const [fid, setFid] = useState(null);
  const [data, setData] = useState(null);
  const [enabled, setEnabled] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Faqs Category  API Call
  const {
    data: { data: faqsData = {} } = {},
    isLoading: categoryLoading,
    refetch: FaqsRefetch,
  } = useGet({
    key: "faqsData",
    endpoint: ContentManage.AllFaqs,
  });

  // Faqs All By Category API Call
  const {
    data: { data: faqsAllData = {} } = {},
    isLoading: faqsAllLoading,
    refetch: FaqsAllRefetch,
  } = useGet({
    key: "faqsAllData",
    enabled: enabled,
    endpoint: `${ContentManage.AllFaqsByCat}${fid}`,
  });

  useEffect(() => {
    if (faqsData?.categories?.length > 0) {
      setFid(faqsData.categories[0]._id);
      setEnabled(true);
    }
  }, [faqsData]);

  useEffect(() => {
    if (fid && enabled) {
      FaqsAllRefetch();
    }
  }, [fid, enabled, FaqsAllRefetch]);

  return (
    <div>
      {categoryLoading || !fid ? (
        <Loader />
      ) : (
        <Tabs orientation="vertical" defaultValue={fid}>
          <div className="flex justify-between items-center w-full border rounded-t-lg  overflow-y-hidden ">
            <div className="w-[57%] lg:w-[80%]">
              <CustomTabs
                tabs={faqsData?.categories}
                setIsActive={setFid}
                setData={setData}
                className={"border-0 "}
              />
            </div>

            <div className=" flex justify-end items-center w-[43%] lg:w-[20%] ">
              <div
                className={
                  "cursor-pointer bg-primary text-white flex justify-center items-center h-[50px] px-5 mb-0 mr-[1px] hover:bg-gray-700 hover:text-white hover:shadow-lg hover:shadow-bg-black"
                }
                onClick={() => setIsEdit(true)}
              >
                <SquarePen className="w-5 h-5 mr-2" />
                <p>Edit</p>
              </div>
              <div
                className={
                  "cursor-pointer bg-primary text-white flex justify-center items-center h-[50px] px-5  mb-0 rounded-tr-lg hover:bg-gray-700 hover:text-white hover:shadow-lg hover:shadow-bg-black"
                }
                onClick={() => setIsOpen(true)}
              >
                <CirclePlus className="w-5 h-5 mr-2" />
                <p>Add</p>
              </div>
            </div>
          </div>

          {faqsData?.categories?.map((item, id) => (
            <TabsContent value={item?._id} className="" key={id}>
              {faqsAllLoading ? (
                <Loader />
              ) : (
                <>
                  <AddFAQForm
                    id={fid}
                    Refetch={FaqsAllRefetch}
                    data={data}
                    setData={setData}
                  />

                  {faqsAllData?.faqs?.map((item, id) => (
                    <FaqsTable
                      key={id}
                      data={item}
                      id={fid}
                      count={id}
                      Refetch={FaqsAllRefetch}
                      setData={setData}
                    />
                  ))}
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}

      <CommonModal open={open} setOpen={setIsOpen} title={"Add New Category"}>
        <AddCategory setOpen={setIsOpen} Refetch={FaqsRefetch} />
      </CommonModal>
      <CommonModal open={isEdit} setOpen={setIsEdit} title={"Edit Categories"}>
        <EditCategory setOpen={setIsOpen} Refetch={FaqsRefetch} />
      </CommonModal>
    </div>
  );
};

export default Faqs;
