import { ContentManage } from "@/api/endpoints";
import DeleteModal from "@/components/common/modals/delet-modal";
import { Button } from "@/components/custom/button";
import { SquarePen, Trash2 } from "lucide-react";
import  { useState } from "react";

const FaqsTable = ({ data, id,Refetch,count,setData}) => {
  const [dopen, setDOpen] = useState(false);
  return (
    <div className="flex justify-between h-24 bg-gray-50 border">
      <div className="h-full w-[80px] items-center flex flex-col justify-center px-2">
        {count}
      </div>
      <div className="flex flex-col w-full">
        <div className="border h-1/2 border-b-0 border-t-0 items-center flex justify-between w-full">
          <div className="border-0 w-full h-full px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none">
            {data?.question}
          </div>
          <div className="flex space-x-2 justify-center items-center w-[150px]">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-lg hover:bg-black hover:text-white"
              onClick={() => {
                setData(data)
              }}
            >
              {" "}
              <SquarePen  size={19} />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="rounded-lg hover:bg-red-500 hover:text-white text-red-500"
              onClick={() => {
                setDOpen(true);
                // setId(row.original?._id);
              }}
            >
              <Trash2 className="w-5 h-5 " />
            </Button>
          </div>
          <DeleteModal
              open={dopen}
              setOpen={setDOpen}
              endpoint={ContentManage.DeleteFaq_By_Cat_Id}
              id={id+"/"+data?._id}
              dataRefetch={Refetch}
            />
        </div>
        <div className="h-1/2 border border-b-0 ">
          <div className="border-0 w-full h-full px-4 py-2 text-gray-600 text-[14px] focus:border-0 focus:outline-none">
            {data?.answer}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FaqsTable;
