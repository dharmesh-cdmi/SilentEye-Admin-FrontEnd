import { Button } from "@/components/custom/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, Info } from "lucide-react";
import { RefundRequestAPI } from "@/api/endpoints";
import useUpdate from "@/hooks/use-update";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { cn } from "@/lib/utils";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { RefundIcons } from "@/assets/icons";

const schema = Yup.object({
  status: Yup.string()
    .oneOf(["Pending", "Approved", "Rejected", "Refunded", "True Refunded"])
    .required("Status is required"),
  reason: Yup.string().required("Message is required"),
});

const optionColor = {
  Pending: "bg-yellow-500",
  Approved: "bg-green-500",
  Rejected: "bg-red-500",
  Refunded: "bg-gray-500",
  "True Refunded": "bg-orange-500",
};

export default function EditRefundForm({
  dataRefetch,
  initialValues,
  children,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutateAsync: refundMutation } = useUpdate({
    endpoint: RefundRequestAPI.Update + initialValues._id,
    isMultiPart: false,
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await refundMutation({
          status: values.status,
          reason: values.reason,
        });
        dataRefetch();
        setOpen(false);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(
          error.response.data.message || "Failed to update refund request"
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const handleChange = (value) => {
    formik.setFieldValue("status", value);
  };

  useEffect(() => {
    if (open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span onClick={() => setOpen(true)}>{children}</span>
        </DialogTrigger>
        <DialogContent className="p-0 max-w-xl !rounded-xl">
          <DialogHeader className="flex flex-row gap-5 p-4 border-b">
            <DialogClose asChild>
              <Button className="w-12 h-10 p-3 bg-white text-black hover:bg-gray-200 border shadow">
                <ArrowLeft />
              </Button>
            </DialogClose>
            <div>
              <DialogTitle className="flex items-center gap-3 font-normal text-xl">
                <RefundIcons size={30} /> Edit Refund Request
              </DialogTitle>
            </div>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit} className="px-4">
            <section className="flex flex-col border divide-y-[1.5px] rounded-lg overflow-hidden">
              <div className="flex divide-x-[1.5px]">
                <div className="min-w-24 flex items-center text-nowrap px-5">
                  Status
                </div>
                <div className="w-full overflow-hidden">
                  <Select
                    value={formik.values.status}
                    onValueChange={handleChange}
                    className="w-full"
                  >
                    <SelectTrigger
                      className={`w-full h-12 px-5 outline-none text-white rounded-none ${
                        optionColor[formik.values.status]
                      }`}
                    >
                      <SelectValue
                        defaultValue="Pending"
                        placeholder="Select Status"
                      />
                    </SelectTrigger>
                    <SelectContent className="max-w-56 !p-0 border rounded-xl">
                      <SelectGroup className="h-full w-full !p-0">
                        <SelectItem
                          className="py-3 cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-white rounded-none"
                          value="Pending"
                        >
                          Pending
                        </SelectItem>
                        <SelectItem
                          className="py-3 cursor-pointer bg-green-500 hover:bg-green-400 text-white rounded-none"
                          value="Approved"
                        >
                          Approved
                        </SelectItem>
                        <SelectItem
                          className="py-3 cursor-pointer bg-red-500 hover:bg-red-400 text-white rounded-none"
                          value="Rejected"
                        >
                          Rejected
                        </SelectItem>
                        <SelectItem
                          className="py-3 cursor-pointer bg-gray-500 hover:bg-gray-400 text-white rounded-none"
                          value="Refunded"
                        >
                          Refunded
                        </SelectItem>
                        <SelectItem
                          className="py-3 cursor-pointer bg-orange-500 hover:bg-orange-400 text-white rounded-none"
                          value="True Refunded"
                        >
                          True Refunded
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex divide-x-[1.5px]">
                <div className="min-w-24 flex items-center text-nowrap px-5">
                  Message
                </div>
                <div className="relative w-full">
                  <textarea
                    rows={3}
                    name="reason"
                    className={cn(
                      "h-full w-full px-5 py-2 outline-none",
                      formik.errors.reason && "border border-rose-500"
                    )}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.reason}
                    placeholder="Write your message"
                  >
                    {formik.values.reason}
                  </textarea>

                  {formik.errors.reason && (
                    <Tooltip>
                      <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                        <Info size={20} />
                      </TooltipTrigger>
                      <TooltipContent className="border-none bg-rose-50 text-rose-500">
                        {formik.errors.reason}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            </section>
            <DialogFooter className="flex justify-between gap-2 py-5">
              <DialogClose asChild>
                <Button className="h-12 text-lg px-10 bg-white text-black hover:bg-gray-200 border shadow">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full text-lg"
              >
                {loading ? "Sending..." : "Send to User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
