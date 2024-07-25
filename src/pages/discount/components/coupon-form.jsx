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
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, isEmptyObject } from "@/lib/utils";
import { useFormik } from "formik";
import { ArrowLeft, Info, Package, Percent } from "lucide-react";
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

  return (
    <TooltipProvider>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="max-w-xl p-0">
          <DialogHeader className="flex flex-row gap-5 p-4 border-b">
            <DialogClose asChild>
              <Button className="w-12 h-10 p-3 bg-white text-black hover:bg-gray-200 border shadow">
                <ArrowLeft />
              </Button>
            </DialogClose>

            <div>
              <DialogTitle className="flex items-center gap-3">
                <Package />{" "}
                {isEmptyObject(initialValues)
                  ? "Add New Coupon"
                  : "Edit Coupon"}
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
                    <div className="relative w-full flex items-center">
                      <input
                        className={cn(
                          "h-12 w-full px-5 outline-none",
                          formik.touched.coupon &&
                            formik.errors.coupon &&
                            "border border-red-400"
                        )}
                        name="coupon"
                        type="text"
                        value={formik.values.coupon}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Coupon Code"
                      />

                      {!formik.touched.coupon ? (
                        <div className="absolute top-3 right-0">
                          <CheckedIcon
                            size={20}
                            className="mx-3 text-gray-400"
                          />
                        </div>
                      ) : formik.errors.coupon ? (
                        <Tooltip>
                          <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                            <Info size={20} />
                          </TooltipTrigger>
                          <TooltipContent className="border-none bg-rose-50 text-rose-500">
                            {formik.errors.coupon}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <CheckedIcon
                          className={cn(
                            "mx-4 text-green-500",
                            formik.errors.coupon && "text-gray-400"
                          )}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex divide-x-[1.5px]">
                  <div className="min-w-24 flex items-center text-nowrap px-5">
                    Discount
                  </div>
                  <div className="h-12 w-full">
                    <div
                      className={cn(
                        "relative h-full flex items-center",
                        formik.touched.discount &&
                          formik.errors.discount &&
                          "border border-red-500"
                      )}
                    >
                      <div className="h-full w-14 flex items-center justify-center border-r-[1.5px]">
                        <Percent size={20} />
                      </div>

                      <div className="w-full flex flex-col">
                        <input
                          className="h-full w-full px-5 outline-none"
                          name="discount"
                          type="number"
                          value={formik.values.discount}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="0.00"
                        />
                      </div>

                      {formik.touched.discount && formik.errors.discount ? (
                        <Tooltip>
                          <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                            <Info size={20} />
                          </TooltipTrigger>
                          <TooltipContent className="border-none bg-rose-50 text-rose-500">
                            {formik.errors.discount}
                          </TooltipContent>
                        </Tooltip>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex divide-x-[1.5px]">
                  <div className="min-w-24 flex items-center text-nowrap px-5">
                    Validity
                  </div>

                  <div className="h-12 w-full">
                    <div
                      className={cn(
                        "relative h-full w-full flex items-center",
                        (formik.errors.validityDate ||
                          formik.errors.validityTime) &&
                          "border border-red-500"
                      )}
                    >
                      <div className="h-full w-14 inline-flex items-center justify-center border-r-[1.5px]">
                        <ValidityCalendarIcon />
                      </div>

                      <div className="h-full w-full flex justify-between items-center divide-x-[1.5px]">
                        <div className="h-full w-full grid grid-cols-2 divide-x-[1.5px]">
                          <input
                            className="h-full w-full px-5 outline-none"
                            name="validityDate"
                            type="date"
                            value={formik.values.validityDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Validity Date"
                          />

                          <input
                            className="h-full w-full px-5 outline-none"
                            name="validityTime"
                            type="time"
                            value={formik.values.validityTime}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Validity Time"
                          />
                        </div>

                        <div className="h-full inline-flex items-center justify-center px-9">
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

                      {(formik.errors.validityTime ||
                        formik.errors.validityDate) && (
                        <Tooltip>
                          <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                            <Info size={20} />
                          </TooltipTrigger>
                          <TooltipContent className="border-none bg-rose-50 text-rose-500">
                            <li>{formik.errors.validityDate}</li>
                            <li>{formik.errors.validityTime}</li>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex divide-x-[1.5px]">
                  <div className="min-w-24 flex items-center text-nowrap px-5">
                    Limit
                  </div>
                  <div className="relative w-full flex flex-col">
                    <input
                      className={cn(
                        "h-12 w-full px-5 outline-none",
                        formik.touched.limit &&
                          formik.errors.limit &&
                          "border border-red-400"
                      )}
                      name="limit"
                      type="number"
                      value={formik.values.limit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter Use Limit"
                    />
                    {formik.touched.limit && formik.errors.limit ? (
                      <Tooltip>
                        <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                          <Info size={20} />
                        </TooltipTrigger>
                        <TooltipContent className="border-none bg-rose-50 text-rose-500">
                          {formik.errors.limit}
                        </TooltipContent>
                      </Tooltip>
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
    </TooltipProvider>
  );
};

export default CouponForm;
