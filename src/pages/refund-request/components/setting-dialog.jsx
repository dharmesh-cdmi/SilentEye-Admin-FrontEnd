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

export default function SettingDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <CommonButton className="h-full">
          <Settings />
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

        <RefundSettingForm onSubmit={(data) => console.log(data)}>
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
