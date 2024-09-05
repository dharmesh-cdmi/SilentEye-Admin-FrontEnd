import { TrackingSetting } from "@/api/endpoints";
import { SettingIcon } from "@/assets/icons";
import Loader from "@/components/common/loader";
import CommonModal from "@/components/common/modals/common-modal";
import DeleteModal from "@/components/common/modals/delet-modal";
import { Button } from "@/components/custom/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AddTopic from "./AddTopic";
import AddSubTopic from "./AddSubTopic";
import useGet from "@/hooks/use-get";

const SettingTracking = () => {
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [openSubDelete, setOpenSubDelete] = useState(false);
  const [topicModal, setTopicModal] = useState(false);
  const [subtopicModal, setSubTopicModal] = useState(false);

  const {
    data: { data: { data: trackingData } = {} } = {},
    isLoading: trackingLoading,
    refetch: TrackingRefetch,
  } = useGet({
    key: "trackingData",
    endpoint: `${TrackingSetting.AllTracking}`,
  });

  const [topics,setTopic] = useState(trackingData?.data?.topics || [])

  useEffect(()=>{
    if(trackingData){
        setTopic(trackingData?.data?.topics)
    }
  },[trackingData])

  if (trackingLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-start items-start border rounded-lg mt-5">
      <div className="bg-gray-200 w-full rounded-t-lg border-b py-2 px-4">
        <button
          className="text-gray-500 text-[16px]"
          onClick={() => setTopicModal(!topicModal)}
        >
          + Add Topic
        </button>
      </div>

      {topics.map((topic) => (
        <div key={topic._id} className="w-full ">
          <div className="flex justify-between items-center border-b px-4 py-3">
            <h3 className="font-semibold text-black text-[14px] ">
              {topic.name}
            </h3>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-lg w-8 h-8 hover:bg-red-500 hover:text-white text-red-500"
              onClick={() => {
                setOpen(true);
                setId(topic._id);
              }}
            >
              <Trash2 className="w-5 h-5 " />
            </Button>
          </div>
          {topic?.subTopics.length > 0 && (
            <>
              {topic.subTopics.map((subTopic, subIndex) => (
                <div
                  key={subIndex}
                  className="flex justify-between items-center border-b  pl-8 pr-4 py-2"
                >
                  <span className="text-[14px] font-medium text-black ">
                    {subTopic}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-lg w-8 h-8 hover:bg-red-500 hover:text-white text-red-500"
                    onClick={() => {
                      setOpenSubDelete(true);
                      setId(topic._id);
                    }}
                  >
                    <Trash2 className="w-5 h-5 " />
                  </Button>
                </div>
              ))}
            </>
          )}
          <div className="w-full px-8 py-2 items-center ">
            <h2
              className="font-medium text-gray-400 cursor-pointer"
              onClick={() => {
                setId(topic?._id);
                setSubTopicModal(!subtopicModal);
              }}
            >
              + Add Sub Topic
            </h2>
          </div>
        </div>
      ))}
      <DeleteModal
        open={open}
        setOpen={setOpen}
        endpoint={TrackingSetting.AddTopic}
        id={id}
        dataRefetch={TrackingRefetch}
      />
      <DeleteModal
        open={openSubDelete}
        setOpen={setOpenSubDelete}
        endpoint={TrackingSetting.AddTopic + `/${id}`}
        id={"subtopics"}
        dataRefetch={TrackingRefetch}
      />

      <CommonModal
        open={topicModal}
        setOpen={setTopicModal}
        title={
          <div className="flex space-x-3 items-center">
            <SettingIcon /> <h2>Add Topic</h2>
          </div>
        }
      >
        <AddTopic setOpen={setTopicModal} Refetch={TrackingRefetch} />
      </CommonModal>

      <CommonModal
        open={subtopicModal}
        setOpen={setSubTopicModal}
        title={
          <div className="flex space-x-3 items-center">
            <SettingIcon /> <h2>Add Sub Topic</h2>
          </div>
        }
      >
        <AddSubTopic setOpen={setSubTopicModal} Refetch={TrackingRefetch} id={id} />
      </CommonModal>
    </div>
  );
};

export default SettingTracking;
