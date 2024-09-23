import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Settings } from "lucide-react";
import CommonButton from "@/components/ui/common-button";
import RefundSettingForm from "./refund-setting-form";
import { Button } from "@/components/custom/button";
import { RefundRequestAPI } from "@/api/endpoints";
import Spinner from "@/components/common/Spinner";
import usePost from "@/hooks/use-post";
import useGet from "@/hooks/use-get";
import toast from "react-hot-toast";
import { useState } from "react";
import { RefundIcons } from "@/assets/icons";

export default function SettingDialog() {
  const [open, setOpen] = useState(false);

  const {
    isLoading,
    data: { data: { data: settingData } = {} } = {},
    refetch: settingRefecth,
  } = useGet({
    endpoint: RefundRequestAPI.GetUpdateSeeting,
  });

  const { mutateAsync: settingUpdate } = usePost({
    endpoint: RefundRequestAPI.GetUpdateSeeting,
    isMultiPart: false,
  });

  const handleSubmit = async (values) => {
    try {
      const res = await settingUpdate(values);
      setOpen(false);
      settingRefecth();
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response.data.message ||
          "Failed to update refund duration settings"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <CommonButton onClick={() => setOpen(true)} className="h-full">
          {isLoading ? <Spinner /> : <Settings />}
        </CommonButton>
      </DialogTrigger>
      <DialogContent className="p-0 max-w-xl !rounded-xl">
        <DialogHeader className="flex flex-row gap-5 p-4 border-b">
          <DialogClose asChild>
            <Button className="w-12 h-10 p-3 bg-white text-black hover:bg-gray-200 border shadow">
              <ArrowLeft />
            </Button>
          </DialogClose>

          <div>
            <DialogTitle className="flex items-center gap-3 font-normal text-lg lg:text-2xl text-nowrap">
              <RefundIcons size={30} /> Edit Refund Request Durations
            </DialogTitle>
          </div>
        </DialogHeader>

        <RefundSettingForm initialValues={settingData} onSubmit={handleSubmit}>
          <DialogFooter className="flex justify-between gap-2 py-5">
            <DialogClose asChild>
              <Button className="h-12 text-lg px-10 bg-white text-black hover:bg-gray-200 border shadow">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="h-12 w-full text-lg">
              Save Setting
            </Button>
          </DialogFooter>
        </RefundSettingForm>
      </DialogContent>
    </Dialog>
  );
}
