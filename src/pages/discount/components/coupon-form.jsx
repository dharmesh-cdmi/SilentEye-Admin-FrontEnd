import {
  CheckedIcon,
  DiscountSqaureIcon,
  ValidityCalendarIcon,
} from "@/assets/icons";
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
import { ArrowLeft, Info, Percent } from "lucide-react";
import { cn, isEmptyObject } from "@/lib/utils";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  coupon: Yup.string().required("Coupon code is required"),
  discountPercent: Yup.number()
    .min(0, "Discount must be at least 0")
    .max(100, "Discount cannot exceed 100")
    .required("Discount is required"),
  validityDate: Yup.date().when("isValidity", {
    is: true,
    then: (schema) => schema.required("Validity date is required"),
  }),
  validityTime: Yup.string().when("isValidity", {
    is: true,
    then: (schema) => schema.required("Validity time is required"),
  }),
  useLimit: Yup.number()
    .min(1, "Limit must be at least 1")
    .required("Limit is required"),
  isValidity: Yup.boolean().default(false),
});

const formatDate = (date) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return "";
  }
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const formatTime = (date) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return "";
  }
  const d = new Date(date);
  const hours = `${d.getHours()}`.padStart(2, "0");
  const minutes = `${d.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
};

const CouponForm = ({
  open,
  setOpen,
  children,
  initialValues = {},
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues: {
      coupon: initialValues.coupon || "",
      discountPercent: initialValues.discountPercent || "",
      validityDate: formatDate(initialValues.validity),
      validityTime: formatTime(initialValues.validity),
      useLimit: initialValues.useLimit || "",
      isValidity:
        initialValues.validity !== undefined &&
        initialValues.validity !== "No Limit",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <span onClick={() => setOpen(true)}>{children}</span>
        </DialogTrigger>
        <DialogContent className="max-w-xl p-0">
          <DialogHeader className="flex flex-row items-center gap-5 p-4 border-b">
            <DialogClose asChild>
              <Button className="w-12 h-10 p-3 bg-white text-black hover:bg-gray-50 border shadow-sm">
                <ArrowLeft />
              </Button>
            </DialogClose>

            <div className="h-full">
              <DialogTitle className="flex items-center gap-2 font-normal text-2xl">
                <DiscountSqaureIcon size={32} />
                {isEmptyObject(initialValues)
                  ? "Add New Coupon"
                  : "Edit Coupon"}
              </DialogTitle>
            </div>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit} className="px-4">
            <section>
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
                        <div className="absolute top-3 right-0">
                          <CheckedIcon
                            size={20}
                            className={cn(
                              "mx-3 text-green-500",
                              formik.errors.coupon && "text-gray-400"
                            )}
                          />
                        </div>
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
                        formik.touched.discountPercent &&
                          formik.errors.discountPercent &&
                          "border border-red-500"
                      )}
                    >
                      <div className="h-full w-14 flex items-center justify-center border-r-[1.5px]">
                        <Percent size={20} />
                      </div>

                      <div className="w-full flex flex-col">
                        <input
                          className="h-full w-full px-5 outline-none"
                          name="discountPercent"
                          type="number"
                          value={formik.values.discountPercent}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="0.00"
                        />
                      </div>

                      {formik.touched.discountPercent &&
                      formik.errors.discountPercent ? (
                        <Tooltip>
                          <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                            <Info size={20} />
                          </TooltipTrigger>
                          <TooltipContent className="border-none bg-rose-50 text-rose-500">
                            {formik.errors.discountPercent}
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
                            className="h-full w-full pl-5 pr-2 outline-none"
                            name="validityDate"
                            type="date"
                            value={formik.values.validityDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Validity Date"
                            disabled={!formik.values.isValidity}
                          />

                          <input
                            className="h-full w-full pl-5 pr-2 outline-none"
                            name="validityTime"
                            type="time"
                            value={formik.values.validityTime}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Validity Time"
                            disabled={!formik.values.isValidity}
                          />
                        </div>

                        <div className="h-full inline-flex items-center justify-center px-9">
                          <Switch
                            name="isValidity"
                            checked={formik.values.isValidity}
                            onCheckedChange={(checked) =>
                              formik.setFieldValue("isValidity", checked)
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
                            {formik.errors.validityTime ||
                              formik.errors.validityDate}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex divide-x-[1.5px]">
                  <div className="min-w-24 flex items-center text-nowrap px-5">
                    Use Limit
                  </div>

                  <div className="h-12 w-full">
                    <div
                      className={cn(
                        "relative h-full flex items-center",
                        formik.touched.useLimit &&
                          formik.errors.useLimit &&
                          "border border-red-500"
                      )}
                    >
                      <div className="w-full flex flex-col">
                        <input
                          className="h-full w-full px-5 outline-none"
                          name="useLimit"
                          type="number"
                          value={formik.values.useLimit}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="0"
                        />
                      </div>

                      {formik.touched.useLimit && formik.errors.useLimit ? (
                        <Tooltip>
                          <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                            <Info size={20} />
                          </TooltipTrigger>
                          <TooltipContent className="border-none bg-rose-50 text-rose-500">
                            {formik.errors.useLimit}
                          </TooltipContent>
                        </Tooltip>
                      ) : null}
                    </div>
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
              <Button
                type="submit"
                className="w-full h-12 text-lg px-10 text-white border"
              >
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
