import { CheckedIcon, ValidityCalendarIcon } from "@/assets/icons";
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { ArrowLeft, Package } from "lucide-react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  coupon: Yup.string().required("Coupon code is required"),
  discount: Yup.number()
    .min(0, "Discount must be at least 0")
    .max(100, "Discount cannot exceed 100")
    .required("Discount is required"),
  validityDate: Yup.date().when("isLive", {
    is: true,
    then: (schema) => schema.required("Validity date is required"),
  }),
  validityTime: Yup.string().when("isLive", {
    is: true,
    then: (schema) => schema.required("Validity time is required"),
  }),
  limit: Yup.number()
    .min(1, "Limit must be at least 1")
    .required("Limit is required"),
  isLive: Yup.boolean().default(false),
});

const CouponForm = ({ children, initialValues = {}, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      coupon: initialValues.coupon || "",
      discount: initialValues.discount || "",
      validityDate: initialValues.validityDate || "",
      validityTime: initialValues.validityTime || "",
      limit: initialValues.limit || "",
      isLive: initialValues.isLive || false,
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const inputFieldClass = "rounded-none rounded-br-xl outline-none px-2.5 h-12";
  const inputBoxClass = cn("border-none", inputFieldClass);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="flex flex-row gap-5 p-4 border-b">
          <DialogClose asChild>
            <Button className="w-12 h-10 p-3 bg-white text-black hover:bg-gray-200 border shadow">
              <ArrowLeft />
            </Button>
          </DialogClose>

          <div>
            <DialogTitle className="flex items-center gap-3">
              <Package /> Edit Coupon
            </DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="px-4">
          <section className="">
            <div className="flex flex-col border divide-y-[1.5px] rounded-lg overflow-hidden">
              <div className="flex divide-x-[1.5px]">
                <div className="min-w-24 flex items-center text-nowrap px-5">
                  Coupon
                </div>
                <div className="w-full flex flex-col">
                  <div className="w-full flex items-center">
                    <Input
                      inputBoxClass={inputBoxClass}
                      className={inputFieldClass}
                      name="coupon"
                      value={formik.values.coupon}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter Coupon Code"
                    />

                    <CheckedIcon
                      className={cn(
                        "mx-4 text-green-500",
                        formik.errors.coupon && "text-gray-400"
                      )}
                    />
                  </div>

                  {formik.touched.coupon && formik.errors.coupon ? (
                    <p className="text-red-500 px-5 text-xs">
                      {formik.errors.coupon}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex divide-x-[1.5px]">
                <div className="min-w-24 flex items-center text-nowrap px-5">
                  Discount
                </div>
                <div className="min-w-16 max-w-16 flex items-center justify-center text-nowrap">
                  %
                </div>
                <div className="w-full flex flex-col">
                  <Input
                    inputBoxClass={inputBoxClass}
                    className={inputFieldClass}
                    name="discount"
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="0.00"
                  />
                  {formik.touched.discount && formik.errors.discount ? (
                    <p className="text-red-500 text-xs px-5">
                      {formik.errors.discount}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex divide-x-[1.5px]">
                <div className="min-w-24 flex items-center text-nowrap px-5">
                  Validity
                </div>
                <div className="min-w-16 max-w-16 flex items-center justify-center text-nowrap">
                  <ValidityCalendarIcon />
                </div>
                <div className="w-full grid grid-cols-2 divide-x-[1.5px]">
                  <div className="flex flex-col">
                    <Input
                      inputBoxClass={inputBoxClass}
                      className={inputFieldClass}
                      name="validityDate"
                      value={formik.values.validityDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter Date"
                      type="date"
                    />
                    {formik.touched.validityDate &&
                    formik.errors.validityDate ? (
                      <p className="text-red-500 text-xs px-5">
                        {formik.errors.validityDate}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <Input
                        inputBoxClass={inputBoxClass}
                        className={inputFieldClass}
                        name="validityTime"
                        value={formik.values.validityTime}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Time"
                        type="time"
                      />
                      {formik.touched.validityTime &&
                      formik.errors.validityTime ? (
                        <p className="text-red-500 text-xs px-5">
                          {formik.errors.validityTime}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center px-4">
                  <Switch
                    name="isLive"
                    checked={formik.values.isLive}
                    onCheckedChange={(checked) =>
                      formik.setFieldValue("isLive", checked)
                    }
                    className="data-[state=checked]:bg-[#34C759]"
                  />
                </div>
              </div>
              <div className="flex divide-x-[1.5px]">
                <div className="min-w-24 flex items-center text-nowrap px-5">
                  Limit
                </div>
                <div className="w-full flex flex-col">
                  <Input
                    inputBoxClass={inputBoxClass}
                    className={inputFieldClass}
                    name="limit"
                    value={formik.values.limit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Use Limit"
                  />
                  {formik.touched.limit && formik.errors.limit ? (
                    <p className="text-red-500 text-xs px-5">
                      {formik.errors.limit}
                    </p>
                  ) : null}
                </div>
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
              Add & Save Coupon
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CouponForm;
