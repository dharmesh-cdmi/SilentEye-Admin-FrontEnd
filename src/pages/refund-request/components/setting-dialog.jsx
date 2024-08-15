import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Package, Settings } from "lucide-react";
import CommonButton from "@/components/ui/common-button";
import RefundSettingForm from "./refund-setting-form";
import { Button } from "@/components/custom/button";
import useGet from "@/hooks/use-get";
import { RefundRequestAPI } from "@/api/endpoints";
import useUpdate from "@/hooks/use-update";
import toast from "react-hot-toast";
import Spinner from "@/components/common/Spinner";
import { useState } from "react";

export default function SettingDialog() {
  const [open, setOpen] = useState(false);

  const { isLoading, data } = useGet({
    endpoint: RefundRequestAPI.AllRefundRequest,
  });

  console.log(data);
  const { mutateAsync: settingUpdate } = useUpdate({
    endpoint: RefundRequestAPI.UpdateSetting,
    isMultiPart: false,
  });

  const handleSubmit = async (values) => {
    try {
      const res = await settingUpdate(values);
      toast.success(res.data.message);
      setOpen(false);
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Failed to update refund duration settings"
      );
    }
  };

  const init = {
    underProcessing: 10,
    initiated: 20,
    refunded: 2,
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
            <DialogTitle className="flex items-center gap-3">
              <Package /> Edit Refund Request Durations
            </DialogTitle>
          </div>
        </DialogHeader>

        <RefundSettingForm initialValues={init} onSubmit={handleSubmit}>
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
