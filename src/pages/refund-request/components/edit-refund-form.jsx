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
import { useFormik } from "formik";
import { ArrowLeft, Package } from "lucide-react";
import * as Yup from "yup";

const schema = Yup.object({
  status: Yup.string()
    .oneOf(["Pending", "Approved", "Reject", "Refunded", "True Refunded"])
    .required("Required"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message should be at least 10 characters"),
});

export default function EditRefundForm({ children }) {
  const formik = useFormik({
    initialValues: {
      status: "Pending",
      message: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="p-0 max-w-xl !rounded-xl">
        <DialogHeader className="flex flex-row gap-5 p-4 border-b">
          <DialogClose asChild>
            <Button className="w-12 h-10 p-3 bg-white text-black hover:bg-gray-200 border shadow">
              <ArrowLeft />
            </Button>
          </DialogClose>

          <div>
            <DialogTitle className="flex items-center gap-3">
              <Package /> Edit Refund Request
            </DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="px-4">
          <section className="flex flex-col border divide-y-[1.5px] rounded-lg overflow-hidden">
            <div className="flex divide-x-[1.5px]">
              <div className="min-w-48 flex items-center text-nowrap px-5">
                Status
              </div>
              <div className="w-full">
                <select
                  className="h-12 w-full px-5 outline-none bg-orange-400 text-white"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                >
                  <option selected>Pending</option>
                  <option>Approved</option>
                  <option>Reject</option>
                  <option>Refunded</option>
                  <option>True Refunded</option>
                </select>
              </div>
            </div>
            <div className="flex divide-x-[1.5px]">
              <div className="min-w-48 flex items-center text-nowrap px-5">
                Message
              </div>
              <div className="w-full">
                <textarea
                  rows={3}
                  name="message"
                  className="w-full px-5 py-2 outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  placeholder="Write your message"
                >
                  {formik.values.message}
                </textarea>

                {formik.touched.message && formik.errors.message ? (
                  <p className="text-red-500 text-xs px-5">
                    {formik.errors.message}
                  </p>
                ) : null}
              </div>
            </div>
          </section>
          <DialogFooter className="flex justify-between gap-2 py-5">
            <DialogClose asChild>
              <Button className="h-12 text-lg px-10 bg-white text-black hover:bg-gray-200 border shadow">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="h-12 w-full text-lg">
              Send to User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
