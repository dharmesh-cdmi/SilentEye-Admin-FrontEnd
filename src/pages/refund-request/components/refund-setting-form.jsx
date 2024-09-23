import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { Info } from "lucide-react";
import * as Yup from "yup";

const RefundSettingForm = ({ children, initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      underProcessing: Yup.number()
        .required("Under processing duration is required")
        .positive("Must be a positive number")
        .integer("Must be an integer"),
      initiated: Yup.number()
        .required("Initiated duration is required")
        .positive("Must be a positive number")
        .integer("Must be an integer"),
      refunded: Yup.number()
        .required("Refund duration is required")
        .positive("Must be a positive number")
        .integer("Must be an integer"),
    }),
    onSubmit,
  });

  return (
    <TooltipProvider>
      <form className="px-4" onSubmit={formik.handleSubmit}>
        <section className="flex flex-col border divide-y-[1.5px] rounded-lg overflow-hidden">
          <div className="flex divide-x-[1.5px]">
            <div className="min-w-40 flex items-center text-nowrap px-5">
              Under Processing
            </div>
            <div className="w-full flex flex-col">
              <div className="relative w-full flex items-center">
                <input
                  className={cn(
                    "h-12 w-full px-5 outline-none",
                    formik.touched.underProcessing &&
                      formik.errors.underProcessing &&
                      "border border-red-400 rounded-tr-lg"
                  )}
                  name="underProcessing"
                  type="text"
                  value={formik.values.underProcessing}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your Duration in Hours Here"
                />

                {formik.touched.underProcessing &&
                  formik.errors.underProcessing && (
                    <Tooltip>
                      <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                        <Info size={20} />
                      </TooltipTrigger>
                      <TooltipContent className="border-none bg-rose-50 text-rose-500">
                        {formik.errors.underProcessing}
                      </TooltipContent>
                    </Tooltip>
                  )}
              </div>
            </div>
          </div>

          <div className="flex divide-x-[1.5px]">
            <div className="min-w-40 flex items-center text-nowrap px-5">
              Initated
            </div>
            <div className="w-full flex flex-col">
              <div className="relative w-full flex items-center">
                <input
                  className={cn(
                    "h-12 w-full px-5 outline-none",
                    formik.touched.initiated &&
                      formik.errors.initiated &&
                      "border border-red-400"
                  )}
                  name="initiated"
                  type="text"
                  value={formik.values.initiated}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your Duration in Hours Here"
                />

                {formik.touched.initiated && formik.errors.initiated && (
                  <Tooltip>
                    <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                      <Info size={20} />
                    </TooltipTrigger>
                    <TooltipContent className="border-none bg-rose-50 text-rose-500">
                      {formik.errors.initiated}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>

          <div className="flex divide-x-[1.5px]">
            <div className="min-w-40 flex items-center text-nowrap px-5">
              Refunded
            </div>
            <div className="w-full flex flex-col">
              <div className="relative w-full flex items-center">
                <input
                  className={cn(
                    "h-12 w-full px-5 outline-none",
                    formik.touched.refunded &&
                      formik.errors.refunded &&
                      "border border-red-400 rounded-br-lg"
                  )}
                  name="refunded"
                  type="text"
                  value={formik.values.refunded}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your Duration in Hours Here"
                />

                {formik.touched.refunded && formik.errors.refunded && (
                  <Tooltip>
                    <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                      <Info size={20} />
                    </TooltipTrigger>
                    <TooltipContent className="border-none bg-rose-50 text-rose-500">
                      {formik.errors.refunded}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </section>
        {children}
      </form>
    </TooltipProvider>
  );
};

export default RefundSettingForm;
